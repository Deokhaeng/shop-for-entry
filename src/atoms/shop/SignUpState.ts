import { atom } from 'recoil';

export const PhoneNumCheck = atom<boolean>({
  key: 'phoneNumCheck',
  default: false,
});

export const Time = atom<number>({
  key: 'time',
  default: 180,
});

export const CheckDuplicate = atom<boolean>({
  key: 'checkDuplicate',
  default: false,
});

export const CheckNum = atom<boolean>({
  key: 'checkNum',
  default: false,
});

export const IdMessage = atom<string>({
  key: 'idMessage',
  default: '',
});

export const PhoneNumMsg = atom<string>({
  key: 'phoneNumMsg',
  default: '',
});

export const AuthenticationMsg = atom<string>({
  key: 'authenticationMsg',
  default: '',
});

export const CheckDupRes = atom<boolean>({
  key: 'checkDupRes',
  default: false,
});

export const ValidationRes = atom<string>({
  key: 'validationRes',
  default: '',
});

// input state
export const ShopName = atom<string>({
  key: 'shopName',
  default: '',
});

export const ManagerContact = atom<string>({
  key: 'managerContact',
  default: '',
});
