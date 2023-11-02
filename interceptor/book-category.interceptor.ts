import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BookCategoryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        let string = '';
        const req = context.switchToHttp().getRequest();
        const { method } = req;
        if (['PATCH', 'DELETE'].includes(method)) {
          switch (method) {
            case 'PATCH':
              string = 'updated';
              break;
            case 'DELETE':
              string = 'deleted';
              break;
            default:
              break;
          }
          if (data.affected > 0) {
            return {
              message: `Book Category with id ${req.params.id} ${string}`,
            };
          }
          throw new NotFoundException(
            `Book Category with id ${req.params.id} not found`,
          );
        }
        if (method === 'GET') {
          if (req.params.id) {
            if (data) {
              return data;
            }
            throw new NotFoundException(
              `Book Category with id ${req.params.id} not found`,
            );
          }
          if (typeof data[1] === 'number') {
            const { page, limit } = req.query;
            const totalPage = Math.ceil(data[1] / limit);
            const prevPage = page > 1 ? page - 1 : null;
            const nextPage = page < totalPage ? Number(page) + 1 : null;
            const result = {
              data: data[0],
              page: parseInt(page),
              total_page: totalPage,
              per_page: parseInt(limit),
              prev_page: prevPage,
              next_page: nextPage,
              total: data[1],
            };
            return result;
          }
        }

        return data;
      }),
    );
  }
}
