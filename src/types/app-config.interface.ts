import { TAppMode } from '@src/types/app-mode.type';

export interface IAppConfig {
  port: number;
  mode: TAppMode;
  apiKey: string;
  secretKey: string;
}
