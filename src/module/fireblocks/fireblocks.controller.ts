import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FireblocksService } from '@src/module/fireblocks/fireblocks.service';
import { CreateVaultAccountDto } from '@src/module/fireblocks/dto/create-vault-account.dto';
import { HideVaultAccountDto } from '@src/module/fireblocks/dto/hide-vault-account.dto';

@Controller('/fireblocks')
export class FireblocksController {
  constructor(private readonly fireblocksService: FireblocksService) {}

  @Get('/vault-accounts')
  private async getVaultAccounts() {
    return this.fireblocksService.getVaultAccounts();
  }

  @Post('vault-accounts/create')
  private async createVaultAccount(@Query() query: CreateVaultAccountDto) {
    return this.fireblocksService.createVaultAccount(query.name);
  }

  @Delete('vault-accounts/hide')
  private async hideVaultAccount(@Query() query: HideVaultAccountDto) {
    return this.fireblocksService.hideVaultAccount(query.id);
  }
}
