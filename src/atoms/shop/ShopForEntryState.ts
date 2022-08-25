import { atom } from 'recoil';

export const PageNumState = atom<number>({
  key: 'pageNum',
  default: 0,
});

export const Contents = atom<any>({
  key: 'Contents',
  default: null,
});

export const ShopHourList = atom<any>({
  key: 'shopHourList',
  default: [
    {
      dateType: 1,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 2,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 3,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 4,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 5,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 6,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 7,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
    {
      dateType: 11,
      dayOff: false,
      endTime: null,
      startTime: null,
    },
  ],
});

export const EntryComplete = atom<boolean>({
  key: 'entryComplete',
  default: false,
});

export const ShopCode = atom<string>({
  key: 'shopCode',
  default: '',
});

export const SpinnerOn = atom<boolean>({
  key: 'spinnerOn',
  default: false,
});
