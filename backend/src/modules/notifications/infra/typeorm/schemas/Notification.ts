import {
  ObjectID,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column()
  recipientId: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn({ default: Date.now() })
  createdAt: Date;

  @UpdateDateColumn({ default: Date.now() })
  updatedAt: Date;
}

export default Notification;
