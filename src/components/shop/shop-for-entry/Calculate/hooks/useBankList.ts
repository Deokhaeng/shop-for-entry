import bankListApi from '@lib/shop/api//bankListApi';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentValue } from '@/atoms/shop/CalculateState';
import { useBankListType } from '@lib/shop/interface';
import { useQuery } from '@tanstack/react-query';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';

export default function useBankList() {
  const { watch, setValue } = useFormContext();
  const pageNum = useRecoilValue(PageNumState);
  const setCurrentValue = useSetRecoilState(CurrentValue);

  return useQuery<useBankListType>(['bankList'], () => bankListApi.getEx(), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      const nowBank = data.items.filter((x) => x.bankCd === watch('contents.bankCd'));
      if (nowBank[0]?.bankCd) {
        const { bankCd } = nowBank[0];
        setValue('contents.bankCd', bankCd);
      }
      if (nowBank[0]?.bankName) {
        const { bankName } = nowBank[0];
        setCurrentValue(bankName);
      }
    },
    onError: (e) => {
      console.log(e);
    },
    enabled: pageNum === 3,
  });
}
