import { stakingAbiBsc } from '@src/common-config/contracts/abi/stakingAbiBsc';
import { btcmtAbiBsc } from '@src/common-config/contracts/abi/btcmtAbiBsc';
import { usdtAbiBsc } from '@src/common-config/contracts/abi/usdtAbiBsc';
import { presaleAbiBsc } from '@src/common-config/contracts/abi/presaleAbiBsc';

export const bscTestnetContractsConfig = {
  StakingBsc: {
    chainName: 'bsc-testnet',
    address: '0x9D11c4eD31774291cB36b566bc3d723c886f1Ca8',
    abi: stakingAbiBsc,
  },
  BtcmtTokenBsc: {
    chainName: 'bsc-testnet',
    address: '0x34238E292e112542c6d7143b2f536579922C1aEb',
    abi: btcmtAbiBsc,
  },
  UsdtTokenBsc: {
    chainName: 'bsc-testnet',
    address: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
    abi: usdtAbiBsc,
  },
  PresaleBsc: {
    chainName: 'bsc-testnet',
    address: '0x7C55fca2a314e20eF48A71eCa63092C2562E3092',
    abi: presaleAbiBsc,
  },
} as const;
