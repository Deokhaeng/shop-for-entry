import { atom } from 'recoil';

export const FacilityListState = atom<any[]>({
  key: 'facilityListState',
  default: null,
});

export const FacilityListform = atom<any[]>({
  key: 'facilityListform',
  default: [],
});

export const ShowOptions = atom<boolean>({
  key: 'showOptions',
  default: false,
});

export const ShopHourListOn = atom<boolean>({
  key: 'shopHourListOn',
  default: false,
});
