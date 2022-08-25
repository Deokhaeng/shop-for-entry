import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setToken } from '@lib/shop/token';
import {
  SchemaOf, object, string, ref, number,
} from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import signUpApi from '@lib/shop/api/signUpApi';
import { useSetRecoilState } from 'recoil';
import checkDupApi from '@lib/shop/api/checkDupApi';
import validationApi from '@lib/shop/api/validateApi';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import { ShopName } from '@/atoms/shop/SignUpState';
import { SignUpFormProps, UpdateSignUpFormProps } from '@lib/shop/interface';

export default function useSignUpForm() {
  const schema: SchemaOf<SignUpFormProps> = object({
    loginKey:
      string()
        .required('아이디가 입력되지 않았습니다.')
        .matches(
          /^[a-zA-Z0-9-_]{5,20}$/,
          '5~20자의 영문, 숫자, 특수기호 (-), (_)만 사용 가능합니다.',
        ),
    password:
      string()
        .matches(
          /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/,
          '영문, 숫자를 포함하여 8~20자를 입력해 주세요.',
        )
        .required('비밀번호가 입력되지 않았습니다.'),
    checkPw:
      string()
        .oneOf([ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .matches(
          /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/,
          '영문, 숫자를 포함하여 8~20자를 입력해 주세요.',
        )
        .required('비밀번호 확인이 입력되지 않았습니다.'),
    name:
      string()
        .required('샵 상호명이 입력되지 않았습니다.'),
    managerName:
      string()
        .required('담당자 이름이 입력되지 않았습니다.'),
    managerContact:
      string()
        .required('핸드폰 번호가 입력되지 않았습니다.'),
    validationNumber:
      string()
        .notOneOf(['인증이 완료되었습니다.'])
        .required(),
    managerEmail:
        string(),
    status: number(),
  }).required('test');

  const methods = useForm({
    defaultValues: {
      loginKey: '',
      password: '',
      checkPw: '',
      validationNumber: '',
      status: 0,
      name: '',
      managerName: '',
      managerContact: '',
      managerEmail: '',
    },

    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const { formState: { errors } } = methods;
  const setPageNum = useSetRecoilState(PageNumState);
  const setShopName = useSetRecoilState(ShopName);

  const onSubmit = useCallback(async (form: SignUpFormProps) => {
    const signUpForm: UpdateSignUpFormProps = form;
    const { loginKey } = signUpForm;
    const validation = {
      phoneNumber: signUpForm.managerContact,
      validationNumber: signUpForm.validationNumber,
    };
    try {
      delete signUpForm.checkPw;
      delete signUpForm.validationNumber;

      // api 요청
      const checkDupData = await checkDupApi.getEx(loginKey);
      const validationData = await validationApi.createEx(validation);
      if (checkDupData.response === true) {
        return;
      }
      if (validationData.response === 'OK') {
        const data = await signUpApi.createEx(signUpForm);
        const { accessToken } = data.contents;
        const { refreshToken } = data.contents;
        setToken(accessToken, refreshToken);
        setPageNum(1);
        setShopName(signUpForm.name);
      }
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
    errors,
  };
}
