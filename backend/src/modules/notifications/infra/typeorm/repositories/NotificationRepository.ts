import { getMongoRepository, Repository, MongoRepository } from 'typeorm';
import INotificationRepository from '../../../repositories/INotificationsRepository';
import Notification from '../schemas/Notification';
import CreateNotificationDTO from '../../../dtos/CreateNotificationDTO';

class NotificationRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipientId,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipientId,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationRepository;
