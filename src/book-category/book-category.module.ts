import { Module } from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { BookCategory } from './entities/book-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookCategoryInterceptor } from 'interceptor/book-category.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])],
  controllers: [BookCategoryController],
  providers: [
    BookCategoryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BookCategoryInterceptor,
    },
  ],
})
export class BookCategoryModule {}
