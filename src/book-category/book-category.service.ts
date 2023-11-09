import { Inject, Injectable } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { FindAllBookCategoryDto } from './dto/find-all-book-category.dto';
import { BookCategory } from './entities/book-category.entity';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookCategoryService {
  constructor(
    // @InjectRepository(BookCategory)
    // private bookCategoryRepository: Repository<BookCategory>,
    @Inject('BOOK_CATEGORY_REPOSITORY')
    private bookCategoryRepository: typeof BookCategory,
  ) {}

  async create(createBookCategoryDto: CreateBookCategoryDto) {
    // const result = await this.bookCategoryRepository.save(
    //   createBookCategoryDto,
    // );
    // await this.bookCategoryRepository.manager.connection.queryResultCache.clear();
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
    // const result = await this.bookCategoryRepository.update(
    //   id,
    //   updateBookCategoryDto,
    // );
    // await this.bookCategoryRepository.manager.connection.queryResultCache.clear();
    const result = await this.bookCategoryRepository.update(
      updateBookCategoryDto,
      {
        where: { id },
      },
    );
    return result;
  }

  async remove(id: number) {
    // const result = await this.bookCategoryRepository.update(id, {
    //   deleted_at: new Date(),
    // });
    // await this.bookCategoryRepository.manager.connection.queryResultCache.clear();
    const result = await this.bookCategoryRepository.destroy({
      where: { id },
    });
    return result;
  }
}
