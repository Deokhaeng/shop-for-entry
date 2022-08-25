import { atom } from 'recoil';

export const CoverImagesState = atom<any>({
  key: 'coverImagesState',
  default: [],
});

export const PortfoliosState = atom<any>({
  key: 'portfoliosState',
  default: [],
});

export const ThumbnailState = atom<any>({
  key: 'thumbnailState',
  default: '',
});
