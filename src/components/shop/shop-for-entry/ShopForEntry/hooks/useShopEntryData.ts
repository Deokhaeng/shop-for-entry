import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import shopApi from '@lib/shop/api/shopApi';
import { ShopEntryFormPropsType } from '@lib/shop/interface';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export default function useShopEntryData(setValue: any) {
  const pageNum = useRecoilValue(PageNumState);

  return useQuery<ShopEntryFormPropsType>(['ShopEntryData'], () => shopApi.getEx(), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      setValue('contents', data.contents);
      const earlyPrice = data.contents.earlyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setValue('contents.earlyPrice', earlyPrice);
      if (data.contents.earlyPrice === 0) { setValue('contents.earlyPrice', ''); }
      if (data.contents.makeUp === null) { setValue('contents.makeUp', true); }
      if (data.contents.personalColor === null) { setValue('contents.personalColor', false); }
      if (data.contents.business === null) { setValue('contents.business', true); }
      if (data.contents.earlyTime === null) { setValue('contents.earlyTime', ''); }
      if (data.contents.lateTime === null) { setValue('contents.lateTime', ''); }
      if (data.contents.way === null) { setValue('contents.way', ''); }
      if (data.contents.accountNum === null) { setValue('contents.accountNum', ''); }
      if (data.contents.addrCd === null) { setValue('contents.addrCd', 0); }
      if (data.contents.addrDetail === null) { setValue('contents.addrDetail', ''); }
      if (data.contents.addrLot === null) { setValue('contents.addrLot', ''); }
      if (data.contents.addrRoad === null) { setValue('contents.addrRoad', ''); }
      if (data.contents.bankCd === null) { setValue('contents.bankCd', ''); }
      if (data.contents.bankbookUrl === null) { setValue('contents.bankbookUrl', ''); }
      if (data.contents.businessName === null) { setValue('contents.businessName', ''); }
      if (data.contents.businessNum === null) { setValue('contents.businessNum', ''); }
      if (data.contents.businessRegUrl === null) { setValue('contents.businessRegUrl', ''); }
      if (data.contents.description === null) { setValue('contents.description'); }
      if (data.contents.homepage === null) { setValue('contents.homepage', ''); }
      if (data.contents.imgUrl === null) { setValue('contents.imgUrl', ''); }
      if (data.contents.name === null) { setValue('contents.name', ''); }
      if (data.contents.sido === null) { setValue('contents.sido', ''); }
      if (data.contents.sigungu === null) { setValue('contents.sigungu', ''); }
      if (data.contents.sigunguCd === null) { setValue('contents.sigunguCd', 0); }
      if (data.contents.phoneMain === null) { setValue('contents.phoneMain', ''); }
    },
    onError: (e) => {
      console.log(e);
      location.reload();
    },
    enabled: pageNum === 1,
  });
}
