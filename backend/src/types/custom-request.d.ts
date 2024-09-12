import { User } from './user-google.interface';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
