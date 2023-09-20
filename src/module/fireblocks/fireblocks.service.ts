import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FIREBLOCKS_DEV_URL,
  FIREBLOCKS_PROD_URL,
} from '@src/module/fireblocks/fireblocks.constants';
import { FireblocksSDK } from 'fireblocks-sdk';

@Injectable()
export class FireblocksService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly fireblocksSDK: FireblocksSDK;

  constructor(configService: ConfigService) {
    this.baseUrl =
      configService.getOrThrow('app.mode') === 'prod' ? FIREBLOCKS_PROD_URL : FIREBLOCKS_DEV_URL;
    this.apiKey = configService.getOrThrow('app.apiKey');
    this.apiSecret = configService.getOrThrow('app.apiSecret');
    this.fireblocksSDK = new FireblocksSDK(this.apiSecret, this.apiKey, this.baseUrl);
  }

  public async getVaultAccounts() {
    try {
      return await this.fireblocksSDK.getVaultAccountsWithPageInfo({});
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
