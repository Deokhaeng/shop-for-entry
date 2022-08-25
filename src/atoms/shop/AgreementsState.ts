import { atom } from 'recoil';

export const AreementFirstOn = atom<boolean>({
  key: 'areementFirstOn',
  default: false,
});

export const AreementsSecondOn = atom<boolean>({
  key: 'areementsSecondOn',
  default: false,
});
