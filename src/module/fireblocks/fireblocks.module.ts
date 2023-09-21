import { Module } from '@nestjs/common';
import { FireblocksApiService } from '@src/module/fireblocks/fireblocks-api.service';
import { FireblocksController } from '@src/module/fireblocks/fireblocks.controller';

@Module({
  controllers: [FireblocksController],
  providers: [FireblocksApiService],
  exports: [],
})
export class FireblocksModule {}
