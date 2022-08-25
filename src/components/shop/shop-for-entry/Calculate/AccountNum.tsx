import React, { useEffect, useState } from 'react';
import { Text } from '@/elements/shop';
import { useFormContext } from 'react-hook-form';
import useAccountInfo from './hooks/useAccountInfo';
import { useSetRecoilState } from 'recoil';
import { AccountNumError } from '@/atoms/shop/CalculateState';
import styled from '@emotion/styled';

function AccountNum() {
  const {
    register, formState: { errors }, watch, setValue,
  } = useFormContext();
  const { contents } = errors as any;
  const accountNum = watch('contents.accountNum');
  const bankCd = watch('contents.bankCd');
  const form = `accountNum=${accountNum}&bankCd=${bankCd}`;
  const [accountMsg, setAccountMsg] = useState('');
  const { checkAccountInfo } = useAccountInfo(form);
  const setAccountNumError = useSetRecoilState(AccountNumError);

  const handleAccountNum = () => {
    const value = watch('contents.accountNum');
    if (value?.length > 0) {
      setValue('contents.accountNum', value.replace(/[^0-9-]/g, ''));
    }
  };

  useEffect(() => {
    if (watch('contents.accountNum') && watch('contents.bankCd')) {
      if (checkAccountInfo.data?.content) {
        setAccountMsg(`예금주 : ${checkAccountInfo.data?.content}`);
      }
    } else if (checkAccountInfo.isError) {
      setAccountMsg('계좌번호가 올바르지 않습니다.');
    } else {
      setAccountMsg('');
    }

    if (checkAccountInfo.error) {
      setAccountNumError(true);
    } else {
      setAccountNumError(false);
    }
  }, [form]);

  useEffect(() => {
    handleAccountNum();
    checkAccountInfo.mutate();
  }, [watch('contents.accountNum')]);

  return (
    <>
      <AccountNumInput
        placeholder="1 2 3 4 - 5 6 7 8 - 9 0 1 2 3 4 5 6 7"
        {...register('contents.accountNum')}
      />
      {!contents?.accountNum && accountMsg
        && <Text validation>{accountMsg}</Text>}
    </>
  );
}

const AccountNumInput = styled.input`
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

export default AccountNum;
