import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const UpdateAvatarService = container.resolve(UpdateUserAvatarService);
    const UpdateAvatar = await UpdateAvatarService.execute({
      userId: req.user.id,
      filename: req.file.filename,
    });

    return res.json(classToClass(UpdateAvatar));
  }
}

export default UserAvatarController;
