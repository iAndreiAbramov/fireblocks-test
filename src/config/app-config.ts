import { registerAs } from '@nestjs/config';
import { IAppConfig } from '@src/types/app-config.interface';
import * as Joi from 'joi';
import * as process from 'process';

export default registerAs('app', (): IAppConfig => {
  const config: IAppConfig = {
    port: parseInt(process.env.PORT),
    apiKey: process.env.API_KEY,
    secretKey: process.env.SECRET_KEY,
  };

  const schema = Joi.object<IAppConfig, null, IAppConfig>({
    port: Joi.number().port().required(),
    apiKey: Joi.string().required(),
    secretKey: Joi.string().required(),
  });

  const { error } = schema.validate(config);

  if (error) {
    throw new Error(`[app config]: ${error.message}`);
  }

  return config;
});
