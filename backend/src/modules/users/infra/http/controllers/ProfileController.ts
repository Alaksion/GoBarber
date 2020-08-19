import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

class UpdateProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateProfileService = container.resolve(UpdateUserService);
    const userId = req.user.id;
    const { password, oldPassword, email, name } = req.body;

    const updatedUser = await updateProfileService.execute({
      password,
      oldPassword,
      email,
      name,
      userId,
    });

    return res.json(classToClass(updatedUser));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showProfileService = container.resolve(ShowProfileService);
    const userId = req.user.id;
    const user = await showProfileService.execute({ userId });
    return res.json(classToClass(user));
    // exibição do perfil
  }
}

export default UpdateProfileController;
