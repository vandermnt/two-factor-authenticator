import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';

export type User = {
  name: string;
  email: string;
  secret?: string;
  password?: string;
};

const users = new Map();

class CreateUserController {
  constructor() {}

  public async handle(request: Request, response: Response) {
    const user = {
      id: uuidV4(),
      ...request.body,
    };
    users.set(request.body.email, user);

    response.status(201).json(Array.from(users.values()));
  }
}

export { CreateUserController, users };
