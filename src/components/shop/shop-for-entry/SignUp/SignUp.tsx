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
      setCheckPwMsg('??????????????? ?????? ??? ??? ??????????????????.');
    }
  };

  const handleManagerEmail = () => {
    const value = watch('managerEmail');
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    // ?????? ?????? ????????? ?????? ??????
    // if (value) {
    //   setValue('managerEmail', value.replace(/[^a-zA-Z0-9`~!@#$%^&*()-_=+]/g, ''));
    // }
    if (!!value && !regex.test(watch('managerEmail'))) {
      setManagerEmail(false);
      if (value?.length > 1) {
        setManagerEmailMsg('????????? ????????? ???????????? ????????????.');
      }
    } else {
      setManagerEmail(true);
      setManagerEmailMsg('');
    }
  };

  useEffect(() => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    if (!regex.test(watch('password'))) {
      setCheckPwMsg('??????, ????????? ???????????? 8~20?????? ????????? ?????????.');
    }
    if (watch('password') !== watch('checkPw') && watch('checkPw')) {
      setCheckPwMsg('??????????????? ???????????? ????????????.');
    }
    if (regex.test(watch('password')) && watch('password') === watch('checkPw')) {
      setCheckPwMsg('');
    }
  }, [watch('password'), watch('checkPw')]);

  useEffect(() => {
    // ????????? ????????? ??????
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
        <IdText>?????????</IdText>
      </IdTextBox>
      <IdBox>
        <Input
          M
          placeholder="???????????? ??????????????????."
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
          ????????????
        </Button>
      </IdBox>
      {errors.loginKey && <Text validation>{errors.loginKey?.message}</Text>}
      {idMessage && idMessage !== errors.loginKey?.message
      && errors.loginKey?.message !== '???????????? ??????????????????.'
      && errors.loginKey?.message !== '5~20?????? ??????, ??????, ???????????? (-), (_)??? ?????? ???????????????.'
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
        <Text>????????????</Text>
      </TextBox>
      <Input
        password
        placeholder="??????????????? ??????????????????."
        register={{ ...register('password') }}
        mode="onChange"
      />
      <div style={{ height: '6px' }} />
      <Input
        password
        placeholder="??????????????? ??????????????????."
        register={{ ...register('checkPw') }}
      />
      {errors.checkPw && <Text validation>{errors.checkPw?.message}</Text>}
      {errors.password && errors.password.message !== errors.checkPw.message
      && <Text validation>{errors.password?.message}</Text>}
      {!errors.checkPw && <Text validation>{checkPwMsg}</Text>}
      <TextBox>
        <span>*</span>
        <Text>??? ?????????</Text>
      </TextBox>
      <Input
        M
        placeholder="???????????? ??????????????????."
        register={{ ...register('name') }}
      />
      {errors.name && <Text validation>{errors.name?.message}</Text>}
      <TextBox>
        <span>*</span>
        <Text>????????? ??????</Text>
      </TextBox>
      <Input
        M
        placeholder="????????? ????????? ??????????????????."
        register={{ ...register('managerName') }}
      />
      {errors.managerName && <Text validation>{errors.managerName?.message}</Text>}
      <TextBox>
        <span>*</span>
        <Text>????????? ?????????</Text>
      </TextBox>
      <IdBox>
        <ManagerContactInput
          placeholder="????????? ????????? ??????????????????."
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
            ?????????
          </Button>
        ) : (
          <Button
            S
            onClick={() => {
              checkManagerContactMutation.mutate(watch('managerContact'));
            }}
            buttonOn={checkNum}
          >
            ??????????????????
          </Button>
        )}
      </IdBox>
      {!errors.managerContact && !phoneNumMsg && (
        <ReservationText
          phoneNumCheck={phoneNumCheck}
        >
          ?????? ????????? ??????????????? ????????? ????????? ??????????????????.
        </ReservationText>
      )}
      {errors.managerContact && <Text validation>{errors.managerContact?.message}</Text>}
      {phoneNumMsg && phoneNumMsg !== errors.managerContact?.message
      && errors.managerContact?.message !== '????????? ????????? ???????????? ???????????????.'
      && <Text validation>{phoneNumMsg}</Text>}
      {phoneNumCheck && (
        <>
          <AuthenticationBox>
            <Input
              authentication
              placeholder="???????????? ??????"
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
          ????????? ??????????????? 3????????? ??????????????????.
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
        <Text>????????? ?????????</Text>
      </TextBox>
      <Input
        M
        placeholder="????????? ????????? ????????? ??????????????????."
        register={{ ...register('managerEmail') }}
      />
      {managerEmailMsg && <Text validation>{managerEmailMsg}</Text>}
      <FooterBox>
        <SubmitInput
          type="submit"
          value="???????????? ??????"
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
