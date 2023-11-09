import { Module } from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookCategoryInterceptor } from 'interceptor/book-category.interceptor';
import { BookCategoryProviders } from './entities/book.providers';

@Module({
  controllers: [BookCategoryController],
  providers: [
    BookCategoryService,
    ...BookCategoryProviders,
    {
      provide: APP_INTERCEPTOR,
      useClass: BookCategoryInterceptor,
    },
  ],
})
export class BookCategoryModule {}
