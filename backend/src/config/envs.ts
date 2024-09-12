import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  SALT_PASSWORD: number;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    POSTGRES_PORT: joi.number().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    SALT_PASSWORD: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  postgresUser: envVars.POSTGRES_USER,
  postgresPassword: envVars.POSTGRES_PASSWORD,
  postgresDb: envVars.POSTGRES_DB,
  postgresPort: envVars.POSTGRES_PORT,
  postgresHost: envVars.POSTGRES_HOST,
  saltPassword: envVars.SALT_PASSWORD,
  jwtSecret: envVars.JWT_SECRET,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
};
