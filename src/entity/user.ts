/**
 * User Entity
 */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity({ name: 'ml_user' })
export class User extends BaseEntity {

  @Column({ name: 'user_name', unique: true, nullable: false })
  userName: string;

  @Column({ select: false, name: 'password', nullable: false })
  password: string;

  @Column({ default: 1 })
  role: number;
}
