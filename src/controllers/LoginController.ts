import { authenticator } from 'otplib';
import { Request, Response } from 'express';
import { users } from './CreateUserController';

class LoginController {
  constructor() {}

  public async handle(request: Request, response: Response) {
    const user = users.get(request.body.email);

    if (!user) {
      response.status(400).json('User not found!');
      return;
    }

    if (user.password !== request.body.password) {
      response.status(403).json('Incorrect password!');
      return;
    }

    const validate = authenticator.verify({
      token: request.body.token,
      secret: user.secret,
    });

    response.status(validate ? 200 : 401).json({ success: validate });
  }
}

export { LoginController };
