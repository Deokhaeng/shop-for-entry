import { atom } from 'recoil';

export const CurrentValue = atom<string>({
  key: 'currentValue',
  default: '정산 은행을 선택해주세요.',
});

export const ShowOptionsCalculate = atom<boolean>({
  key: 'showOptionsCalculate',
  default: false,
});

export const BusinessNumMsg = atom<string>({
  key: 'businessNumMsg',
  default: '',
});

export const AccountNumError = atom<boolean>({
  key: 'accountNumError',
  default: false,
});
