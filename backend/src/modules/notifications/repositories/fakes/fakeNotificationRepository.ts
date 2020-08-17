import { ObjectID } from 'mongodb';
import INotificationRepository from '../INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';
import CreateNotificationDTO from '../../dtos/CreateNotificationDTO';

class FakeNotifications implements INotificationRepository {
  private notifications: Array<Notification> = [];

  public async create({
    content,
    recipientId,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { recipientId, content, id: new ObjectID() });

    this.notifications.push(notification);
    return notification;
  }
}

export default FakeNotifications;
