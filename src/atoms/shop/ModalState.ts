import { atom } from 'recoil';

export const ModalMessage = atom<string>({
  key: 'modalMessage',
  default: '',
});

export const LoginModalOn = atom<boolean>({
  key: 'loginModalOn',
  default: false,
});

export const ShopEntryModalOn = atom<boolean>({
  key: 'shopEntryModalOn',
  default: false,
});
