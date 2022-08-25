import { CheckNum, PhoneNumCheck, PhoneNumMsg } from '@/atoms/shop/SignUpState';
import validationNumApi from '@lib/shop/api/validationNumApi';
import { useCheckManagerContactType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function useCheckManagerContact() {
  const checkNum = useRecoilValue(CheckNum);
  const setPhoneNumMsg = useSetRecoilState(PhoneNumMsg);
  const setPhoneNumCheck = useSetRecoilState(PhoneNumCheck);

  const getCheckManagerContact = async (managerContact:string):
  Promise<useCheckManagerContactType> => {
    const data = await validationNumApi.getEx(managerContact);

    return data;
  };

  const checkManagerContactMutation = useMutation(
    getCheckManagerContact,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data, variabla) => {
        if (checkNum === false) {
          setPhoneNumMsg('핸드폰 번호가 입력되지 않았습니다.');
        }
        if (variabla.length < 13) {
          setPhoneNumMsg('핸드폰 번호를 정확히 입력해주세요.');
        }
        if (checkNum === true && (variabla.length === 11 || variabla.length === 13)) {
          if (data.response === 'OK') {
            setPhoneNumCheck(true);
            setPhoneNumMsg('인증번호가 발송되었습니다.');
          }
        }
      },
    },
  );

  return { checkManagerContactMutation };
}
