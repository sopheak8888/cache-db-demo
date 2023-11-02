import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BookInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        let string = '';
        const req = context.switchToHttp().getRequest();
        const { method } = req;
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
        if (['PATCH', 'DELETE'].includes(method)) {
          if (data.affected > 0) {
            return {
              message: `Book with id ${req.params.id} ${string}`,
            };
          }
          return {
            message: `Book with id ${req.params.id} not found`,
          };
        }
        if (method === 'GET' && typeof data[1] === 'number') {
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
        return data;
      }),
    );
  }
}
