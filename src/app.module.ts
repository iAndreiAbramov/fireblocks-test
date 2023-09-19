import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/module/app-config/app-config.module';
import { FireblocksModule } from '@src/module/fireblocks/fireblocks.module';

@Module({
  imports: [AppConfigModule, FireblocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
