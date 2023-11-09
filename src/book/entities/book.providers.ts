import { Book } from './book.entity';

export const BookProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useValue: Book,
  },
];
