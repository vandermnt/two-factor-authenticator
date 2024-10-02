import express from 'express';
import { LoginController } from './controllers/LoginController';
import { CreateUserController } from './controllers/CreateUserController';
import { RegisterTwoFactorController } from './controllers/RegisterTwoFactorController';

const app = express();
app.use(express.json());

const loginController = new LoginController();
const createUserController = new CreateUserController();
const registerTwoAndFactor = new RegisterTwoFactorController();

app.post('/login', loginController.handle);
app.post('/user', createUserController.handle);
app.post('/two-factor/register/:email', registerTwoAndFactor.handle);

app.listen(5003, () => {
  console.log('Running server in de port 5003');
});
