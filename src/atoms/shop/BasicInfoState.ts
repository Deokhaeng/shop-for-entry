import { atom } from 'recoil';

// 우편번호
export const AddrCd = atom<string>({
  key: 'addrCd',
  default: '',
});
// 도로명 주소
export const AddrRoad = atom<string>({
  key: 'addrRoad',
  default: '',
});
// 지번 주소
export const AddrLot = atom<string>({
  key: 'addrLot',
  default: '',
});

export const Sido = atom<string>({
  key: 'sido',
  default: '',
});

export const Sigungu = atom<string>({
  key: 'sigungu',
  default: '',
});

export const SigunguCd = atom<string>({
  key: 'sigunguCd',
  default: '',
});
