import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Book extends Model {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'timestamp' })
  deleted_at: Date;
}
