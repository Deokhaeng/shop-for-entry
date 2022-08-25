import { ValidationRes } from '@/atoms/shop/SignUpState';
import validationApi from '@lib/shop/api/validateApi';
import { useCheckValidationNumberType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

export default function useCheckValidationNumber() {
  const setValidationRes = useSetRecoilState(ValidationRes);

  const postCheckValidationNumber = async (validation: object):
  Promise<useCheckValidationNumberType> => {
    const data = await validationApi.createEx(validation);

    return data;
  };

  const checkValidationNumberMutation = useMutation(
    postCheckValidationNumber,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setValidationRes(data.response);
      },
    },
  );

  return { checkValidationNumberMutation };
}
