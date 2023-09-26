import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChainId, FireblocksWeb3Provider } from '@fireblocks/fireblocks-web3-provider';
import { ethers } from 'ethers';
import { bscTestnetContractsConfig } from '@src/common-config/contracts/contracts.config';
import {
  FIREBLOCKS_DEV_URL,
  FIREBLOCKS_PROD_URL,
} from '@src/module/fireblocks/fireblocks.constants';
import { parseUnits } from 'ethers/lib/utils';

@Injectable()
export class FireblocksWeb3Service {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly baseUrl: string;
  private readonly eip1193Provider: FireblocksWeb3Provider;
  private readonly provider: ethers.providers.Web3Provider;
  private readonly btcmtContract: ethers.Contract;
  private readonly usdtContract: ethers.Contract;
  private readonly presaleContract: ethers.Contract;
  private readonly stakingContract: ethers.Contract;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl =
      configService.getOrThrow('app.mode') === 'prod' ? FIREBLOCKS_PROD_URL : FIREBLOCKS_DEV_URL;
    this.apiKey = this.configService.getOrThrow('app.apiKey');
    this.apiSecret = this.configService.getOrThrow('app.apiSecret');
    this.eip1193Provider = new FireblocksWeb3Provider({
      apiKey: this.apiKey,
      apiBaseUrl: this.baseUrl,
      privateKey: this.apiSecret,
      chainId: ChainId.BSC_TEST,
      vaultAccountIds: [1],
    });
    this.provider = new ethers.providers.Web3Provider(this.eip1193Provider);
    this.btcmtContract = new ethers.Contract(
      bscTestnetContractsConfig.BtcmtTokenBsc.address,
      bscTestnetContractsConfig.BtcmtTokenBsc.abi,
      this.provider.getSigner(),
    );
    this.usdtContract = new ethers.Contract(
      bscTestnetContractsConfig.UsdtTokenBsc.address,
      bscTestnetContractsConfig.UsdtTokenBsc.abi,
      this.provider.getSigner(),
    );
    this.presaleContract = new ethers.Contract(
      bscTestnetContractsConfig.PresaleBsc.address,
      bscTestnetContractsConfig.PresaleBsc.abi,
      this.provider.getSigner(),
    );
    this.stakingContract = new ethers.Contract(
      bscTestnetContractsConfig.StakingBsc.address,
      bscTestnetContractsConfig.StakingBsc.abi,
      this.provider.getSigner(),
    );
  }

  public async getBtcmtAllowance() {
    // BTCMT address in fireblocks
    const accountAddress = '0xd3f0274fA50729eF4c216147062fAC0136a26aFD';
    // Staking contract address
    const spenderAddress = bscTestnetContractsConfig.StakingBsc.address;

    return await this.btcmtContract.allowance(accountAddress, spenderAddress);
  }

  public async approveBtcmtAllowance() {
    const amount = '1';
    // Staking contract address
    const spenderAddress = bscTestnetContractsConfig.StakingBsc.address;

    return await this.btcmtContract.approve(spenderAddress, parseUnits(amount));
  }

  public async approveUsdtAllowance() {
    const amount = '100000000000000000';
    const spenderAddress = bscTestnetContractsConfig.PresaleBsc.address;

    return await this.usdtContract.approve(spenderAddress, amount);
  }

  // Покупка не работает, вылетает ошибка, что недостаточно газа, хотя его овердофига.
  public async purchaseBtcmt() {
    // Wallet address in fireblocks
    const accountAddress = '0xd3f0274fA50729eF4c216147062fAC0136a26aFD';

    const btcmtAmount = '1';

    return await this.presaleContract.buy(parseUnits(btcmtAmount), parseUnits('0'), {
      from: accountAddress,
      gasLimit: parseUnits('300000'),
    });
  }

  public async stakeBtcmt() {
    // Wallet address in fireblocks
    const accountAddress = '0xd3f0274fA50729eF4c216147062fAC0136a26aFD';
    const unlockedValue = '1';
    const lockedValue = '0';

    return this.stakingContract.stakeStart(parseUnits(unlockedValue), parseUnits(lockedValue), {
      from: accountAddress,
      gasLimit: parseUnits('300000'),
    });
  }

  public async withdrawBtcmt() {
    // Wallet address in fireblocks
    const accountAddress = '0xd3f0274fA50729eF4c216147062fAC0136a26aFD';
    const unlockedValue = '1';
    const lockedValue = '0';

    return this.stakingContract.stakeEndPartially(
      parseUnits(lockedValue),
      parseUnits(unlockedValue),
      {
        from: accountAddress,
        gasLimit: parseUnits('300000'),
      },
    );
  }
}
