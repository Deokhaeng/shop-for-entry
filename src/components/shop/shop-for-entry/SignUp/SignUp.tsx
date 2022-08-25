import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input, Button, Text } from '../../../../elements/shop';
import {
  useRecoilState, useRecoilValue, useResetRecoilState,
} from 'recoil';
import {
  PhoneNumCheck, Time, AuthenticationMsg, CheckDuplicate, IdMessage,
  PhoneNumMsg, ValidationRes, CheckNum, ManagerContact,
} from '../../../../atoms/shop/SignUpState';
import Timer from './Timer';
import useCheckDup from './hooks/useCheckDup';
import useCheckManagerContact from './hooks/useCheckManagerContact';
import useCheckValidationNumber from './hooks/useCheckValidationNumber';
import { useFormContext } from 'react-hook-form';

function SignUp() {
  const [checkDuplicate, setCheckDuplicate] = useRecoilState(CheckDuplicate);
  const [checkNum, setCheckNum] = useRecoilState(CheckNum);
  const [managerContact, setManagerContact] = useRecoilState(ManagerContact);
  const resetCounter = useResetRecoilState(Time);
  const idMessage = useRecoilValue(IdMessage);
  const phoneNumMsg = useRecoilValue(PhoneNumMsg);
  const phoneNumCheck = useRecoilValue(PhoneNumCheck);
  const authenticationMsg = useRecoilValue(AuthenticationMsg);
  const validationRes = useRecoilValue(ValidationRes);
  const [checkPwMsg, setCheckPwMsg] = useState('');
  const [managerEmail, setManagerEmail] = useState(true);
  const [managerEmailMsg, setManagerEmailMsg] = useState('');
  const {
    register, watch, formState: { errors }, setValue,
  } = useFormContext();
  const { checkValidationNumberMutation } = useCheckValidationNumber();
  const { checkManagerContactMutation } = useCheckManagerContact();
  const { checkDupMutation } = useCheckDup();
  const submitOn = (watch('loginKey').length !== 0
  && watch('password').length !== 0
  && watch('checkPw').length !== 0
  && watch('name').length !== 0
  && watch('managerName').length !== 0
  && watch('managerContact').length !== 0
  && watch('validationNumber').length !== 0
  && managerEmail
  );

  const handleManagerContact = (managerContact:string) => {
    setManagerContact(managerContact);
  };

  const changeManagerContact = (e:any) => {
    const { value } = e.target;
    if (value.length > 0) {
      const managerContact = value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      setValue('managerContact', managerContact);
    }
  };

  const handleCheckDuplicate = () => {
    if (watch('loginKey').length > 0) {
      setCheckDuplicate(true);
    } else {
      setCheckDuplicate(false);
    }
  };

  const handleCheckNum = () => {
    if (watch('managerContact').length > 0) {
      setCheckNum(true);
    } else {
      setCheckNum(false);
    }
  };

  const handleCheckPwMsg = () => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    if (regex.test(watch('password')) && !watch('checkPw')) {
      setCheckPwMsg('비밀번호를 다시 한 번 입력해주세요.');
    }
  };

  const handleManagerEmail = () => {
    const value = watch('managerEmail');
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    // 한글 입력 못하게 하는 조건
    // if (value) {
    //   setValue('managerEmail', value.replace(/[^a-zA-Z0-9`~!@#$%^&*()-_=+]/g, ''));
    // }
    if (!!value && !regex.test(watch('managerEmail'))) {
      setManagerEmail(false);
      if (value?.length > 1) {
        setManagerEmailMsg('이메일 형식이 올바르지 않습니다.');
      }
    } else {
      setManagerEmail(true);
      setManagerEmailMsg('');
    }
  };

  useEffect(() => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    if (!regex.test(watch('password'))) {
      setCheckPwMsg('영문, 숫자를 포함하여 8~20자를 입력해 주세요.');
    }
    if (watch('password') !== watch('checkPw') && watch('checkPw')) {
      setCheckPwMsg('비밀번호가 일치하지 않습니다.');
    }
    if (regex.test(watch('password')) && watch('password') === watch('checkPw')) {
      setCheckPwMsg('');
    }
  }, [watch('password'), watch('checkPw')]);

  useEffect(() => {
    // 담당자 이메일 조건
    handleManagerEmail();
  }, [watch('managerEmail')]);

  return (
    <SignUpWrap
      onClick={(e) => {
        handleCheckPwMsg();
        e.stopPropagation();
      }}
    >
      <IdTextBox>
        <span>*</span>
        <IdText>아이디</IdText>
      </IdTextBox>
      <IdBox>
        <Input
          M
          placeholder="아이디를 입력해주세요."
          register={{ ...register('loginKey') }}
          onKeyUp={() => {
            handleCheckDuplicate();
          }}
        />
        <Button
          S
          onClick={() => {
            checkDupMutation.mutate(watch('loginKey'));
          }}
          buttonOn={checkDuplicate}
        >
          중복확인
        </Button>
      </IdBox>
      {errors.loginKey && <Text validation>{errors.loginKey?.message}</Text>}
      {idMessage && idMessage !== errors.loginKey?.message
      && errors.loginKey?.message !== '아이디를 입력해주세요.'
      && errors.loginKey?.message !== '5~20자의 영문, 숫자, 특수기호 (-), (_)만 사용 가능합니다.'
      && (
      <Text
        validation
        message={idMessage}
      >
        {idMessage}
      </Text>
      )}
      <TextBox>
        <span>*</span>
        <Text>비밀번호</Text>
      </TextBox>
      <Input
        password
        placeholder="비밀번호를 입력해주세요."
        register={{ ...register('password') }}
        mode="onChange"
      />
      <div style={{ height: '6px' }} />
      <Input
        password
        placeholder="비밀번호를 확인해주세요."
        register={{ ...register('checkPw') }}
      />
      {errors.checkPw && <Text validation>{errors.checkPw?.message}</Text>}
      {errors.password && errors.password.message !== errors.checkPw.message
      && <Text validation>{errors.password?.message}</Text>}
      {!errors.checkPw && <Text validation>{checkPwMsg}</Text>}
      <TextBox>
        <span>*</span>
        <Text>샵 상호명</Text>
      </TextBox>
      <Input
        M
        placeholder="상호명을 입력해주세요."
        register={{ ...register('name') }}
      />
      {errors.name && <Text validation>{errors.name?.message}</Text>}
      <TextBox>
        <span>*</span>
        <Text>담당자 이름</Text>
      </TextBox>
      <Input
        M
        placeholder="담당자 이름을 입력해주세요."
        register={{ ...register('managerName') }}
      />
      {errors.managerName && <Text validation>{errors.managerName?.message}</Text>}
      <TextBox>
        <span>*</span>
        <Text>담당자 연락처</Text>
      </TextBox>
      <IdBox>
        <ManagerContactInput
          placeholder="핸드폰 번호를 입력해주세요."
          {...register('managerContact')}
          onKeyUp={() => {
            handleManagerContact(watch('managerContact'));
            handleCheckNum();
          }}
          onChange={(e) => {
            changeManagerContact(e);
          }}
          maxLength={13}
        />
        {phoneNumCheck ? (
          <Button
            S
            onClick={() => {
              checkManagerContactMutation.mutate(watch('managerContact'));
              if (watch('managerContact').length === 11 || watch('managerContact').length === 13) {
                resetCounter();
              }
            }}
            buttonOn={checkNum}
          >
            재전송
          </Button>
        ) : (
          <Button
            S
            onClick={() => {
              checkManagerContactMutation.mutate(watch('managerContact'));
            }}
            buttonOn={checkNum}
          >
            인증번호받기
          </Button>
        )}
      </IdBox>
      {!errors.managerContact && !phoneNumMsg && (
        <ReservationText
          phoneNumCheck={phoneNumCheck}
        >
          예약 정보를 공유받으실 휴대폰 번호를 입력해주세요.
        </ReservationText>
      )}
      {errors.managerContact && <Text validation>{errors.managerContact?.message}</Text>}
      {phoneNumMsg && phoneNumMsg !== errors.managerContact?.message
      && errors.managerContact?.message !== '핸드폰 번호가 입력되지 않았습니다.'
      && <Text validation>{phoneNumMsg}</Text>}
      {phoneNumCheck && (
        <>
          <AuthenticationBox>
            <Input
              authentication
              placeholder="인증번호 입력"
              register={{ ...register('validationNumber') }}
              onKeyUp={() => {
                const validation = { phoneNumber: watch('managerContact'), validationNumber: watch('validationNumber') };
                if (watch('validationNumber').length === 6) { checkValidationNumberMutation.mutate(validation); }
              }}
            />
            <Timer validationRes={validationRes} />
          </AuthenticationBox>
          {!authenticationMsg
        && (
        <Text
          validation
          message={authenticationMsg}
        >
          발송된 인증번호를 3분내에 입력해주세요.
        </Text>
        )}
          <Text
            validation
            message={authenticationMsg}
          >
            {authenticationMsg}
          </Text>
        </>
      )}
      <TextBox>
        <Text>담당자 이메일</Text>
      </TextBox>
      <Input
        M
        placeholder="담당자 이메일 주소를 입력해주세요."
        register={{ ...register('managerEmail') }}
      />
      {managerEmailMsg && <Text validation>{managerEmailMsg}</Text>}
      <FooterBox>
        <SubmitInput
          type="submit"
          value="회원가입 하기"
          submitBtnOn={submitOn}
          disabled={!submitOn}
        />
      </FooterBox>
    </SignUpWrap>
  );
}

const SignUpWrap = styled.div`
  gap: 5px;
`;

const IdTextBox = styled.div`
  display: flex;
  & > span {
      color: #D55B42;
  }
`;

const IdText = styled.label`
  color: #746052;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const TextBox = styled.label`
  display: flex;
  color: #746052;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 700;
  & > span {
      margin-top: 5px;
      color: #D55B42;
  }
`;

const IdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReservationText = styled.p<{ phoneNumCheck: boolean }>`
  margin-top: 5px;
  ${({ phoneNumCheck }) => (phoneNumCheck ? css`
  margin-bottom: 3px !important;` : 'magin-bottom: 8px')}
`;

const AuthenticationBox = styled.div`
  display: flex;
  position: relative;
`;

const FooterBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  margin-top: auto;
  padding: 0 16px;
  display: flex;
`;

const ManagerContactInput = styled.input`
      &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin-right: 9px;
  padding-left: 15px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const SubmitInput = styled.input<{ submitBtnOn: boolean }>`
  cursor: pointer;
  width: 100%;
  height: 54px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background: #E3E3E3;
  border: none;
  border-radius: 10px;
  margin: 25px 0;
  ${({ submitBtnOn }) => (submitBtnOn ? css`background: #746052` : 'background: #BEAC9F')}
`;

export default SignUp;
