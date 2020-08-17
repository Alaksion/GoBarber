import { container } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import './providers';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
  'notificationRepository',
  NotificationRepository,
);
