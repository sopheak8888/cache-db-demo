import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookInterceptor } from 'interceptor/book.interceptor';
import { Book } from './entities/book.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
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
