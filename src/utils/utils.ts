import { ETHERS_DECIMALS } from '@src/constants/ethers-decimals.const';

const getZeroString = (length: number): string => {
  if (length < 0) {
    return '';
  }

  let result = '';

  for (let i = 0; i < length; i++) {
    result += '0';
  }

  return result;
};

export const transformValueToEtherString = (value: string): string => {
  const preparedValue = value.replace(',', '.');

  const zeroReturningConditions: boolean[] = [
    isNaN(Number(value)),
    preparedValue === '0',
    /^0{2,}/.test(preparedValue),
    /^(0[1-9])/.test(preparedValue),
    !/[1-9]/g.test(preparedValue),
    !/^\d/g.test(preparedValue),
  ];

  if (zeroReturningConditions.some((item) => item)) {
    return '0';
  }

  if (!preparedValue.includes('.')) {
    return `${preparedValue}${getZeroString(ETHERS_DECIMALS)}`;
  }

  let [beforeDot, afterDot] = preparedValue.split('.');

  if (beforeDot !== '0') {
    beforeDot = beforeDot.replace(/^0{2,}/, '0');

    return `${beforeDot}${afterDot.slice(0, ETHERS_DECIMALS)}${getZeroString(
      ETHERS_DECIMALS - afterDot?.length,
    )}`;
  }

  const afterDotStartZeros = afterDot.match(/^0*/)?.[0]?.length || 0;
  afterDot = afterDot.slice(0, ETHERS_DECIMALS).replace(/^0+/, '');
  const afterDotLengthWithoutZeros = afterDot.replace(/0+$/, '').length;
  const result =
    `${afterDot}${getZeroString(
      ETHERS_DECIMALS - afterDotStartZeros - afterDotLengthWithoutZeros,
    )}` || '0';

  return /[1-9]/g.test(result) ? result : result.replace(/0+/g, '0');
};

export const transformValueToEtherBigInt = (value: string): bigint => {
  return BigInt(transformValueToEtherString(value));
};
