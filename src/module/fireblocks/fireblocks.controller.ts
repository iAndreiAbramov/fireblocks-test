import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FireblocksApiService } from '@src/module/fireblocks/fireblocks-api.service';
import { CreateVaultAccountDto } from '@src/module/fireblocks/dto/create-vault-account.dto';
import { HideVaultAccountDto } from '@src/module/fireblocks/dto/hide-vault-account.dto';
import { FireblocksWeb3Service } from '@src/module/fireblocks/fireblocks-web3.service';

@Controller('/fireblocks')
export class FireblocksController {
  constructor(
    private readonly fireblocksApiService: FireblocksApiService,
    private readonly fireblocksWeb3Service: FireblocksWeb3Service,
  ) {}

  @Get('/vault-accounts')
  private async getVaultAccounts() {
    return this.fireblocksApiService.getVaultAccounts();
  }

  @Post('vault-accounts/create')
  private async createVaultAccount(@Query() query: CreateVaultAccountDto) {
    return this.fireblocksApiService.createVaultAccount(query.name);
  }

  @Delete('vault-accounts/hide')
  private async hideVaultAccount(@Query() query: HideVaultAccountDto) {
    return this.fireblocksApiService.hideVaultAccount(query.id);
  }

  @Get('allowance/get')
  private async getAllowance() {
    return await this.fireblocksWeb3Service.getBtcmtAllowance();
  }
}
