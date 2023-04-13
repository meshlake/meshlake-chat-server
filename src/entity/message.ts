/**
 * Message Entity
 */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Chat } from './chat';

@Entity({ name: 'ml_message' })
export class Message extends BaseEntity {

  @ManyToOne(() => Chat)
  @JoinColumn({ name: 'chat_id' })
  chatId: string;

  @Column({ nullable: true })
  inversion: boolean;

  @Column({ nullable: true })
  text: string;
}
