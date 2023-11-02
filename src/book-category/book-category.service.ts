import { Inject, Injectable } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { FindAllBookCategoryDto } from './dto/find-all-book-category.dto';
import { BookCategory } from './entities/book-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BookCategoryService {
  constructor(
    @InjectRepository(BookCategory)
    private bookRepository: Repository<BookCategory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const result = await this.bookRepository.save(createBookCategoryDto);
    await this.cacheManager.del('bookCategory_list_*');
    return result;
  }

  async findAll(filter: FindAllBookCategoryDto) {
    const cache = await this.cacheManager.get(
      'bookCategory_list_' + JSON.stringify(filter),
    );
    if (cache) return cache;
    const result = await this.bookRepository.findAndCount({
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
    await this.cacheManager.set(
      'bookCategory_' + JSON.stringify(filter),
      result,
    );
    return result;
  }

  async findOne(id: number) {
    const cache = await this.cacheManager.get('bookCategory_' + id);
    if (cache) return cache;
    const result = await this.bookRepository.findOneBy({ id });
    if (result) await this.cacheManager.set('bookCategory_' + id, result);
    return result;
  }

  async update(id: number, updateBookCategoryDto: UpdateBookCategoryDto) {
    const result = await this.bookRepository.update(id, updateBookCategoryDto);
    if (result.affected > 0) {
      await this.cacheManager.del('bookCategory_list_*');
      await this.cacheManager.del('bookCategory_' + id);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.bookRepository.update(id, {
      deleted_at: new Date(),
    });
    if (result.affected > 0) {
      await this.cacheManager.del('bookCategory_list_*');
      await this.cacheManager.del('bookCategory_' + id);
    }
    return result;
  }
}
