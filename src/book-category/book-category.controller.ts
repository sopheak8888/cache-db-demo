import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { FindAllBookCategoryDto } from './dto/find-all-book-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('book-category')
@ApiTags('Book Category')
export class BookCategoryController {
  constructor(private readonly bookCategoryService: BookCategoryService) {}

  @Post()
  create(@Body() createBookCategoryDto: CreateBookCategoryDto) {
    return this.bookCategoryService.create(createBookCategoryDto);
  }

  @Get()
  findAll(@Query() filter: FindAllBookCategoryDto) {
    return this.bookCategoryService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookCategoryDto: UpdateBookCategoryDto,
  ) {
    return this.bookCategoryService.update(+id, updateBookCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCategoryService.remove(+id);
  }
}
