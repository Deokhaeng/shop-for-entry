import React from 'react';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { CurrentValue } from '@/atoms/shop/CalculateState';
import useBankList from '@components/shop/shop-for-entry/Calculate/hooks/useBankList';

function BankOptionList() {
  const { setValue } = useFormContext();
  const { data } = useBankList();
  const bankList = data?.items;
  const setCurrentValue = useSetRecoilState(CurrentValue);

  return (
    <div>
      {bankList && bankList.map((x) => (
        <Option
          key={x.bankCd}
          value={x.bankName}
          onClick={() => {
            const { bankName } = x;
            const { bankCd } = x;
            setCurrentValue(bankName);
            setValue('contents.bankCd', bankCd);
            setValue('contents.accountNum', '');
          }}
        >
          {x.bankName}
        </Option>
      ))}
    </div>
  );
}

const Option = styled.li`
  font-size: 14px;
  padding: 10px 13px 7px 13px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background: #333333;
    opacity: 80%;
    color: #FBFBFB;
  }
`;

export default BankOptionList;
