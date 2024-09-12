import * as bcrypt from 'bcrypt';
import { envs } from 'src/config/envs';

export const passwordEncoder = (data: string): string => {
  return bcrypt.hashSync(data, envs.saltPassword);
};

export const passwordDecoder = (password, passEncoder) => {
  return bcrypt.compareSync(password, passEncoder);
};
