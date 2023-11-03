import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { FindAllBookDto } from './dto/find-all-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const result = await this.bookRepository.save(createBookDto);
    await this.bookRepository.manager.connection.queryResultCache.clear();
    return result;
  }

  async findAll(filter: FindAllBookDto) {
    const result = await this.bookRepository.findAndCount({
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
      cache: 100000,
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.bookRepository.findOne({
      where: { id },
      cache: 100000,
    });
    return result;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const result = await this.bookRepository.update(id, updateBookDto);
    await this.bookRepository.manager.connection.queryResultCache.clear();
    return result;
  }

  async remove(id: number) {
    const result = await this.bookRepository.update(id, {
      deleted_at: new Date(),
    });
    await this.bookRepository.manager.connection.queryResultCache.clear();
    return result;
  }
}
