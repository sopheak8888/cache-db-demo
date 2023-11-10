import { Injectable } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { FindAllBookCategoryDto } from './dto/find-all-book-category.dto';
import { BookCategory } from './entities/book-category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookCategoryService {
  constructor(
    @InjectModel(BookCategory)
    private bookCategoryRepository: typeof BookCategory,
  ) {}

  async create(createBookCategoryDto: CreateBookCategoryDto) {
    const result = await this.bookCategoryRepository.create(
      createBookCategoryDto as any,
    );
    return result;
  }

  async findAll(filter: FindAllBookCategoryDto) {
    const result = await this.bookCategoryRepository.findAndCountAll({
      offset: (filter.page - 1) * filter.limit,
      limit: filter.limit,
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.bookCategoryRepository.findOne({
      where: { id },
    });
    return result;
  }

  async update(id: number, updateBookCategoryDto: UpdateBookCategoryDto) {
    const result = await this.bookCategoryRepository.update(
      updateBookCategoryDto,
      {
        where: { id },
      },
    );
    return result;
  }

  async remove(id: number) {
    const result = await this.bookCategoryRepository.destroy({
      where: { id },
    });
    return result;
  }
}
