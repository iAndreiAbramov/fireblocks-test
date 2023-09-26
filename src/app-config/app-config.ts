import { registerAs } from '@nestjs/config';
import { IAppConfig } from '@src/types/app-config.interface';
import * as Joi from 'joi';
import * as process from 'process';
import { TAppMode } from '@src/types/app-mode.type';

export default registerAs('app', (): IAppConfig => {
  const config: IAppConfig = {
    port: parseInt(process.env.PORT),
    mode: process.env.MODE as TAppMode | undefined,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  };

  const schema = Joi.object<IAppConfig, null, IAppConfig>({
    port: Joi.number().port().required(),
    mode: Joi.string().required().valid('dev', 'prod'),
    apiKey: Joi.string().required(),
    apiSecret: Joi.string().required(),
  });

  const { error } = schema.validate(config);

  if (error) {
    throw new Error(`[app config]: ${error.message}`);
  }

  return config;
});
