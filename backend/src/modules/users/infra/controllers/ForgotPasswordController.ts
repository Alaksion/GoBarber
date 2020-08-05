import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendPasswordEmailService from '../../services/SendPasswordEmailService';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendEmail = container.resolve(SendPasswordEmailService);
    await sendEmail.execute({ email });
    return res.status(204).json();
  }
}

export default ForgotPasswordController;
