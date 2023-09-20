import { Controller, Get } from '@nestjs/common';
import { FireblocksService } from '@src/module/fireblocks/fireblocks.service';

@Controller('/fireblocks')
export class FireblocksController {
  constructor(private readonly fireblocksService: FireblocksService) {}

  @Get('/vault-accounts')
  private async getVaultAccounts() {
    return this.fireblocksService.getVaultAccounts();
  }
}
