// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class BookCategory {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 50, unique: true })
//   name: string;

//   @Column({ type: 'timestamp', nullable: true, select: false })
//   deleted_at: Date;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }

import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class BookCategory extends Model {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamp' })
  deleted_at: Date;
}
