import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkinXEntity } from './skinx.entity';

@Entity({ name: 'users', synchronize: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  active: boolean;

  // relation with skinxs:
  @OneToMany(() => SkinXEntity, (skinx) => skinx.user)
  skinxs: SkinXEntity[];
}
