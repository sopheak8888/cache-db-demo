import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
// import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { FindAllBookDto } from './dto/find-all-book.dto';

@Injectable()
export class BookService {
  constructor(
    // @InjectRepository(Book)
    // private bookRepository: Repository<Book>,
    @Inject('BOOK_REPOSITORY')
    private bookRepository: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto) {
    // const result = await this.bookRepository.save(createBookDto);
    // await this.bookRepository.manager.connection.queryResultCache.clear();
    const result = await this.bookRepository.create(createBookDto as any);
    return result;
  }

  async findAll(filter: FindAllBookDto) {
    // const result = await this.bookRepository.findAndCount({
    //   skip: (filter.page - 1) * filter.limit,
    //   take: filter.limit,
    //   cache: 100000,
    // });
    const result = await this.bookRepository.findAndCountAll({
      offset: (filter.page - 1) * filter.limit,
      limit: filter.limit,
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.bookRepository.findOne({
      where: { id },
    });
    return result;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    // const result = await this.bookRepository.update(id, updateBookDto);
    // await this.bookRepository.manager.connection.queryResultCache.clear();
    const result = await this.bookRepository.update(updateBookDto, {
      where: { id },
    });
    return result;
  }

  async remove(id: number) {
    // const result = await this.bookRepository.update(id, {
    //   deleted_at: new Date(),
    // });
    // await this.bookRepository.manager.connection.queryResultCache.clear();
    const result = await this.bookRepository.destroy({ where: { id } });
    return result;
  }
}
