import facilityApi from '@lib/shop/api/facilityApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FacilityListState } from '@/atoms/shop/DetailInfoState';
import { useFacilityListType } from '@lib/shop/interface';
import { useQuery } from '@tanstack/react-query';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';

export default function useFacilityList() {
  const [facilityList, setFacilityList] = useRecoilState(FacilityListState);
  const pageNum = useRecoilValue(PageNumState);

  return useQuery<useFacilityListType>(['facilityList'], () => facilityApi.getEx(), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (facilityList === null) {
        setFacilityList(data.items.map((x) => ({ ...x, facilityOn: false })));
      }
    },
    onError: (e) => {
      console.log(e);
    },
    enabled: pageNum === 2,
  });
}
