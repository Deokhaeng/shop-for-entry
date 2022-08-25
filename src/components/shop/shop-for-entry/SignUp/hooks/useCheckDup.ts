import { CheckDuplicate, IdMessage } from '@/atoms/shop/SignUpState';
import checkDupApi from '@lib/shop/api/checkDupApi';
import { useCheckDupType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function useCheckDup() {
  const checkDuplicate = useRecoilValue(CheckDuplicate);
  const setIdMessage = useSetRecoilState(IdMessage);

  const getCheckDup = async (loginKey:string): Promise<useCheckDupType> => {
    const data = await checkDupApi.getEx(loginKey);

    return data;
  };

  const checkDupMutation = useMutation(
    getCheckDup,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data, variabla) => {
        if (checkDuplicate === false) {
          setIdMessage('아이디가 입력되지 않았습니다.');
        }
        if (checkDuplicate === true) {
          const regex = /^[a-zA-Z0-9-_]{5,20}$/;
          if (data.response === true) {
            setIdMessage('아이디가 중복되었습니다.');
          } else if (!regex.test(variabla)) {
            setIdMessage('5~20자의 영문, 숫자, 특수기호 (-), (_)만 사용 가능합니다.');
          } else {
            setIdMessage('사용할 수 있는 아이디입니다.');
          }
        }
      },
    },
  );

  return { checkDupMutation };
}
