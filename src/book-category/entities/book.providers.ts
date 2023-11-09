import { BookCategory } from './book-category.entity';

export const BookCategoryProviders = [
  {
    provide: 'BOOK_CATEGORY_REPOSITORY',
    useValue: BookCategory,
  },
];
