import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Show extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  show_id: string;

  @ManyToOne(type => User, user => user.myList, { eager: false, onDelete: 'CASCADE'})
  user: User;

  @Column()
  userId: number;
}
