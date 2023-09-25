import { stakingAbiBsc } from '@src/common-config/contracts/abi/stakingAbiBsc';
import { btcmtAbiBsc } from '@src/common-config/contracts/abi/btcmtAbiBsc';

export enum ContractName {
  StakingBsc = 'StakingBsc',
  BtcmtTokenBsc = 'BtcmtTokenBsc',
}

export const bscTestnetContractsConfig = {
  [ContractName.StakingBsc]: {
    chainName: 'bsc-testnet',
    address: '0x9D11c4eD31774291cB36b566bc3d723c886f1Ca8',
    abi: stakingAbiBsc,
  },
  [ContractName.BtcmtTokenBsc]: {
    chainName: 'bsc-testnet',
    address: '0x34238E292e112542c6d7143b2f536579922C1aEb',
    abi: btcmtAbiBsc,
  },
} as const;
