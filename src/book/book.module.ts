import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookInterceptor } from 'interceptor/book.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BookInterceptor,
    },
  ],
})
export class BookModule {}
