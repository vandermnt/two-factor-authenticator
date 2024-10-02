import QRCode from 'qrcode';
import { authenticator } from 'otplib';
import { Request, Response } from 'express';
import { users } from './CreateUserController';

const SERVICE = 'Omnichat';

class RegisterTwoFactorController {
  constructor() {}

  public async handle(request: Request, response: Response) {
    const user = users.get(request.params.email);

    if (!user) {
      response.status(400).json('User not found');
      return;
    }

    const secret = authenticator.generateSecret();
    user.secret = secret;

    const otpauth = authenticator.keyuri(user.email, SERVICE, secret);

    const qrcodeUrl = await new Promise((resolve, reject) => {
      QRCode.toDataURL(otpauth, (error, imageUrl) => {
        if (error) {
          console.log('Error generate qrcode');
          response.status(500).json({ message: error.message });
          reject(error);
        }
        resolve(imageUrl);
      });
    });

    response.status(200).json({ qrcodeUrl });
  }
}

export { RegisterTwoFactorController };
