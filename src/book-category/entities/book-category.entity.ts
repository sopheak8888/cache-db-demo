import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'book_categories',
})
export class BookCategory extends Model {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamp' })
  deleted_at: Date;
}
