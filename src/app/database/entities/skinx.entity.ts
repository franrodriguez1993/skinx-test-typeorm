import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'skinxs', synchronize: true })
export class SkinXEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  //purchased
  @ManyToOne(() => SkinXEntity, (skinX) => skinX.purchasedList)
  @JoinColumn({ name: 'purchased_from' })
  purchasedFrom: SkinXEntity;

  @OneToMany(() => SkinXEntity, (skinX) => skinX.purchasedFrom)
  purchasedList: SkinXEntity[];

  //forked
  @ManyToOne(() => SkinXEntity, (skinX) => skinX.forkedList)
  @JoinColumn({ name: 'forked_from' })
  forkedFrom: SkinXEntity;

  @OneToMany(() => SkinXEntity, (skinX) => skinX.forkedFrom)
  forkedList: SkinXEntity[];

  // relation with user:
  @ManyToOne(() => UserEntity, (user) => user.skinxs)
  user: UserEntity;
}
