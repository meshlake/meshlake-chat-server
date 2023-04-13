/**
 * Chat Entity
 */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { User } from './user';

@Entity({ name: 'ml_chat' })
export class Chat extends BaseEntity {

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column({ nullable: false })
  name: string;
}
