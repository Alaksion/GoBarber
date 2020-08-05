import {
  Entity,
  Column,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('UsersToken')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  userId: string;
}

export default UserToken;
