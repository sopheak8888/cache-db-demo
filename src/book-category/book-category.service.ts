import { Injectable } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { FindAllBookCategoryDto } from './dto/find-all-book-category.dto';
import { BookCategory } from './entities/book-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookCategoryService {
  constructor(
    @InjectRepository(BookCategory)
    private bookCategoryRepository: Repository<BookCategory>,
  ) {}

  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const result = await this.bookCategoryRepository.save(
      createBookCategoryDto,
    );
    await this.bookCategoryRepository.manager.connection.queryResultCache.clear();
    return result;
  }

  async findAll(filter: FindAllBookCategoryDto) {
    const result = await this.bookCategoryRepository.findAndCount({
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
      cache: 10000,
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.bookCategoryRepository.findOne({
      where: { id },
      cache: 10000,
    });
    return result;
  }

  async update(id: number, updateBookCategoryDto: UpdateBookCategoryDto) {
    const result = await this.bookCategoryRepository.update(
      id,
      updateBookCategoryDto,
    );
    await this.bookCategoryRepository.manager.connection.queryResultCache.clear();
    return result;
  }

  async remove(id: number) {
    const result = await this.bookCategoryRepository.update(id, {
      deleted_at: new Date(),
    });
    await this.bookCategoryRepository.manager.connection.queryResultCache.clear();
    return result;
  }
}
