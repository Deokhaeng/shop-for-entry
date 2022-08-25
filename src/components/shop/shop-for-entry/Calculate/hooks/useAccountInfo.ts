import acconutInfoApi from '@lib/shop/api/accountInfoApi';
import { useAccountInfoType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function useAccountInfo(form:string) {
  const [_loading, setLoading] = useState(false);

  const getAccountInfo = async ():Promise<useAccountInfoType> => {
    const data = await acconutInfoApi.getEx(form);

    return data;
  };

  const checkAccountInfo = useMutation(
    getAccountInfo,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        setLoading(true);
      },
    },
  );

  return {
    checkAccountInfo,
  };
}
