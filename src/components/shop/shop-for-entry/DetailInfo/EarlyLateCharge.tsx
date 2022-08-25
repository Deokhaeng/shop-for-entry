import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

function EarlyLateCharge() {
  const { register, setValue, watch } = useFormContext();

  const handleEarlyTime = () => {
    const value = watch('contents.earlyTime');
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (value.length > 0) {
      const earlyTime = value.replace(/[^0-9]/g, '');
      setValue('contents.earlyTime', earlyTime);
    }
    if (value.length === 4) {
      let earlyTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      if (!pattern.test(earlyTime)) { earlyTime = ''; }
      setValue('contents.earlyTime', earlyTime);
    }
    if (value.length === 5) {
      const earlyTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      setValue('contents.earlyTime', earlyTime);
    }
  };

  const handleLateTime = () => {
    const value = watch('contents.lateTime');
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (value.length > 0) {
      const lateTime = value.replace(/[^0-9]/g, '');
      setValue('contents.lateTime', lateTime);
    }
    if (value.length === 4) {
      let lateTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      if (!pattern.test(lateTime)) { lateTime = ''; }
      setValue('contents.lateTime', lateTime);
    }
    if (value.length === 5) {
      const lateTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      setValue('contents.lateTime', lateTime);
    }
  };

  const handleEarlyPrice = () => {
    const value = watch('contents.earlyPrice');
    if (value.length > 0) {
      const earlyPrice = value.replace(/[^0-9]/g, '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setValue('contents.earlyPrice', earlyPrice);
    }
  };

  useEffect(() => {
    handleEarlyPrice();
    handleEarlyTime();
    handleLateTime();
  }, [watch('contents.earlyPrice'), watch('contents.earlyTime'), watch('contents.lateTime')]);

  return (
    <EarlyLateChargeWrap>
      <div>
        <DayText>얼리차지</DayText>
        <EarlyLateInput
          type="text"
          placeholder="09:00"
          {...register('contents.earlyTime')}
          maxLength={5}
        />
      </div>
      <div>
        <DayText>레이트차지</DayText>
        <EarlyLateInput
          type="text"
          placeholder="21:00"
          {...register('contents.lateTime')}
          maxLength={5}
        />
      </div>
      <div>
        <DayText>금액(원)</DayText>
        <EarlyLateInput
          type="text"
          placeholder="금액"
          {...register('contents.earlyPrice')}
          maxLength={9}
        />
      </div>
    </EarlyLateChargeWrap>
  );
}

const EarlyLateChargeWrap = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 6px;
`;
const DayText = styled.p`
  color: #9A8576;
  font-size: 10px;
  font-weight: 400;
  margin: 0.3rem 0;
`;

const EarlyLateInput = styled.input`
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
  padding: 0 16px;
  color: #9A8576;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
  }
`;

export default EarlyLateCharge;
