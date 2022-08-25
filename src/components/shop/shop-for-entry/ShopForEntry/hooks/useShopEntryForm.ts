import { useCallback, useState } from 'react';
import { ShopCode } from '@/atoms/shop/ShopForEntryState';
import { yupResolver } from '@hookform/resolvers/yup';
import shopApi from '@lib/shop/api/shopApi';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import {
  SchemaOf, object, string, mixed, boolean, number,
} from 'yup';
import { ShopEntryFormPropsType } from '../../../../../lib/shop/interface';

function useShopEntryForm() {
  const entrySchema: SchemaOf<ShopEntryFormPropsType> = object().shape({
    contents: object().shape({
      accountNum: string().required('계좌번호가 입력되지 않았습니다.').nullable(true),
      addrCd: number().required('주소가 입력되지 않았습니다.').nullable(true),
      addrDetail: string().required('상세주소가 입력되지 않았습니다.').nullable(true),
      addrLot: string().required('주소가 입력되지 않았습니다.').nullable(true),
      addrRoad: string().required('주소가 입력되지 않았습니다.').nullable(true),
      bankCd: string().required('정산 은행이 입력되지 않았습니다.').nullable(true),
      business: boolean().required().nullable(true),
      businessName: string().required('사업자명 or 이름이 입력되지 않았습니다.').nullable(true),
      businessNum: string().required('사업자번호 or 주민등록번호가 입력되지 않았습니다.').nullable(true),
      businessRegUrl: string().required('사업자등록증 사본 or 신분증 사본이 업로드되지 않았습니다.').nullable(true),
      description: string().required('샵 상세소개가 입력되지 않았습니다.').nullable(true),
      name: string().required('상호명이 입력되지 않았습니다.').nullable(true),
      makeUp: boolean().required('').nullable(true),
      personalColor: boolean().required('').nullable(true),
      shopHourList: mixed().required('운영정보가 입력되지 않았습니다.').nullable(true),
      sido: string().required('주소가 입력되지 않았습니다.').nullable(true),
      sigungu: string().required('주소가 입력되지 않았습니다.').nullable(true),
      sigunguCd: number().required('주소가 입력되지 않았습니다.').nullable(true),
      way: string().nullable(true),
    }),
  }).required('test');

  const methods = useForm({
    defaultValues: {
      contents: {
        makeUp: false,
        business: false,
        personalColor: false,
        shopHourList: [],
        earlyTime: '',
        lateTime: '',
        way: '',
        accountNum: '',
        addrCd: 0,
        addrDetail: '',
        addrLot: '',
        addrRoad: '',
        bankCd: '',
        bankbookUrl: '',
        businessName: '',
        businessNum: '',
        businessRegUrl: '',
        coverImages: [],
        description: '',
        earlyPrice: '',
        homepage: '',
        imgUrl: '',
        name: '',
        portfolios: [],
        shopFacilityList: [],
        sido: '',
        sigungu: '',
        sigunguCd: 0,
        phoneMain: '',
      },
    },
    resolver: yupResolver(entrySchema),
  });

  const { handleSubmit } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const setShopCode = useSetRecoilState(ShopCode);

  const onSubmit = useCallback(async () => {
    try {
      // api 요청
      const data = await shopApi.createEx();
      setShopCode(data.content);
      setIsLoading(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
    methods,
    onSubmit,
  };
}

export default useShopEntryForm;
