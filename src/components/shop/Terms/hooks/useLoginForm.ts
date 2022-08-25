import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setToken } from '@lib/shop/token';
import { yupResolver } from '@hookform/resolvers/yup';
import loginApi from '@lib/shop/api/loginApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ModalMessage, LoginModalOn } from '@/atoms/shop/ModalState';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import { useRouter } from 'next/router';
import {
  SchemaOf, object, string,
} from 'yup';
import { LoginFormProps } from '@lib/shop/interface';

function useLoginForm() {
  const schema: SchemaOf<LoginFormProps> = object({
    id:
      string()
        .matches(
          /^[a-zA-Z0-9-_]{5,20}$/,
          '5~20자의 영문, 숫자, 특수기호 (-), (_)만 사용 가능합니다.',
        )
        .required('아이디가 입력되지 않았습니다.'),
    password:
      string()
        .matches(
          /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/,
          '영문, 숫자를 포함하여 8~20자를 입력해 주세요.',
        )
        .required('비밀번호가 입력되지 않았습니다.'),
  }).required();

  const methods = useForm({
    defaultValues: {
      id: '',
      password: '',
    },

    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const { formState: { errors } } = methods;
  const setModalOn = useSetRecoilState(LoginModalOn);
  const [pageNum, setPageNum] = useRecoilState(PageNumState);
  const setModalMessage = useSetRecoilState(ModalMessage);
  const router = useRouter();

  const handlePageNum = () => {
    setPageNum(1);
    router.push('/shop/signup');
  };

  const onSubmit = useCallback(async (form: LoginFormProps) => {
    try {
      // api 요청
      const data = await loginApi.createEx(form);
      const { accessToken } = data.contents;
      const { refreshToken } = data.contents;
      handlePageNum();
      setToken(accessToken, refreshToken);
    } catch (e) {
      // 이미 입점신청 완료일 때 팝업창
      const { code } = e.response.data;
      if (code === 'ACC107') {
        setModalOn(true);
        setModalMessage('샵 입점 신청이\n이미 완료되었어요.\n의 파트너앱으로\n로그인을 시도해주세요.');
      }
      if (code === 'ACC400') {
        setModalOn(true);
        setModalMessage('존재하지 않는 계정입니다.');
      }
      if (code === 'ACC300') {
        setModalOn(true);
        setModalMessage('비밀번호가 일치하지 않습니다.');
      }
      // setModalOn(true);
      // setModalMessage('로그인을 다시 시도해주세요.');
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
    methods,
    errors,
  };
}

export default useLoginForm;
