import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const result = await this.bookRepository.save(createBookDto);
    await this.cacheManager.del('book_list_*');
    return result;
  }

  async findAll(filter: FindAllBookDto) {
    const cache = await this.cacheManager.get(
      'book_list_' + JSON.stringify(filter),
    );
    if (cache) return cache;
    const result = await this.bookRepository.findAndCount({
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
    await this.cacheManager.set('book_' + JSON.stringify(filter), result);
    return result;
  }

  async findOne(id: number) {
    const cache = await this.cacheManager.get('book_' + id);
    if (cache) return cache;
    const result = await this.bookRepository.findOneBy({ id });
    if (result) await this.cacheManager.set('book_' + id, result);
    return result;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const result = await this.bookRepository.update(id, updateBookDto);
    if (result.affected > 0) {
      await this.cacheManager.del('book_list_*');
      await this.cacheManager.del('book_' + id);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.bookRepository.delete(id);
    if (result.affected > 0) {
      await this.cacheManager.del('book_list_*');
      await this.cacheManager.del('book_' + id);
    }
    return result;
  }
}
