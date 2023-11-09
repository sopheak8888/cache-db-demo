import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookInterceptor } from 'interceptor/book.interceptor';
import { BookProviders } from './entities/book.providers';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    ...BookProviders,
    {
      provide: APP_INTERCEPTOR,
      useClass: BookInterceptor,
    },
  ],
})
export class BookModule {}
