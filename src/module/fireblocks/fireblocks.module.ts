import { Module } from '@nestjs/common';
import { FireblocksService } from '@src/module/fireblocks/fireblocks.service';
import { FireblocksController } from '@src/module/fireblocks/fireblocks.controller';

@Module({
  controllers: [FireblocksController],
  providers: [FireblocksService],
  exports: [],
})
export class FireblocksModule {}
