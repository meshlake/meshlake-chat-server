import { Column, PrimaryGeneratedColumn } from 'typeorm';
/**
 * @author supervons
 * Base Entity.
 * Unified common column,such as id/createTime/updateTime.
 */
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'create_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ name: 'update_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;
}
