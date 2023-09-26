import { Module } from '@nestjs/common';
import { FireblocksApiService } from '@src/module/fireblocks/fireblocks-api.service';
import { FireblocksController } from '@src/module/fireblocks/fireblocks.controller';
import { FireblocksWeb3Service } from '@src/module/fireblocks/fireblocks-web3.service';

@Module({
  controllers: [FireblocksController],
  providers: [FireblocksApiService, FireblocksWeb3Service],
  exports: [],
})
export class FireblocksModule {}
