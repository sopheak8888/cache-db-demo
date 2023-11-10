import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'books',
})
export class Book extends Model {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'integer' })
  category_id: number;

  @Column({ type: 'timestamp' })
  deleted_at: Date;
}
