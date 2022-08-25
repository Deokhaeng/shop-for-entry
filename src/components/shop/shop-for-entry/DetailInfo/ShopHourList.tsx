import React, { ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Input, Button } from '../../../../elements/shop';
import { FaCheck } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';

function ShopHourList() {
  const {
    register, setValue, getValues, watch,
  } = useFormContext();
  const shopHourList = watch('contents.shopHourList');

  const handleStartTime = (e:ChangeEvent<HTMLInputElement>, index:number) => {
    const { value } = e.target;
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (value.length > 0) {
      const startTime = value.replace(/[^0-9]/g, '');
      setValue(`contents.shopHourList.${index}.startTime`, startTime);
    }
    if (value.length === 4) {
      let startTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      if (!pattern.test(startTime)) { startTime = ''; }
      setValue(`contents.shopHourList.${index}.startTime`, startTime);
    }
    if (value.length === 5) {
      const startTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      setValue(`contents.shopHourList.${index}.startTime`, startTime);
    }
  };

  const handleEndTime = (e:ChangeEvent<HTMLInputElement>, index:number) => {
    const { value } = e.target;
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (value.length > 0) {
      const endTime = value.replace(/[^0-9]/g, '');
      setValue(`contents.shopHourList.${index}.endTime`, endTime);
    }
    if (value.length === 4) {
      let endTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      if (!pattern.test(endTime)) { endTime = ''; }
      setValue(`contents.shopHourList.${index}.endTime`, endTime);
    }
    if (value.length === 5) {
      const endTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      setValue(`contents.shopHourList.${index}.endTime`, endTime);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '6px', margin: '6px 23px 0 23px' }}>
        <div style={{ minWidth: '4.2rem', paddingLeft: '2px' }}>
          <DayText>요일</DayText>
        </div>
        <div style={{ width: '100%' }}>
          <DayText>시작 시간</DayText>
        </div>
        <div style={{ width: '100%' }}>
          <DayText>끝 시간</DayText>
        </div>
        <div style={{ minWidth: '20px', marginRight: '5px', paddingLeft: '1px' }}>
          <DayText>휴무</DayText>
        </div>
      </div>
      <DayWrap>
        <DayBox>
          <Day dayOn={watch('contents.shopHourList.0.dayOff')}>월요일</Day>
          <Day dayOn={watch('contents.shopHourList.1.dayOff')}>화요일</Day>
          <Day dayOn={watch('contents.shopHourList.2.dayOff')}>수요일</Day>
          <Day dayOn={watch('contents.shopHourList.3.dayOff')}>목요일</Day>
          <Day dayOn={watch('contents.shopHourList.4.dayOff')}>금요일</Day>
          <Day dayOn={watch('contents.shopHourList.5.dayOff')}>토요일</Day>
          <Day dayOn={watch('contents.shopHourList.6.dayOff')}>일요일</Day>
          <Day dayOn={watch('contents.shopHourList.7.dayOff')}>공휴일</Day>
        </DayBox>
        <ul>
          {shopHourList && shopHourList.map((item:any, index:number) => (
            <ShopHourBox key={item.dateType}>
              <ShopHourInput
                type="text"
                placeholder="09:00"
                inputOn={getValues(`contents.shopHourList.${index}.dayOff`)}
                {...register(`contents.shopHourList.${index}.startTime`)}
                disabled={getValues(`contents.shopHourList.${index}.dayOff`)}
                onChange={(e) => { handleStartTime(e, index); }}
                maxLength={5}
              />
              <ShopHourInput
                type="text"
                placeholder="21:00"
                inputOn={getValues(`contents.shopHourList.${index}.dayOff`)}
                {...register(`contents.shopHourList.${index}.endTime`)}
                disabled={getValues(`contents.shopHourList.${index}.dayOff`)}
                onChange={(e) => { handleEndTime(e, index); }}
                maxLength={5}
              />
              <Button
                RectangleCheckOff
                buttonOn={getValues(`contents.shopHourList.${index}.dayOff`)}
                onClick={() => {
                  setValue(`contents.shopHourList.${index}`, {
                    ...getValues(`contents.shopHourList.${index}`),
                    dayOff: !getValues(`contents.shopHourList.${index}.dayOff`),
                  });
                }}
              >
                <FaCheck />
              </Button>
            </ShopHourBox>
          ))}
        </ul>
      </DayWrap>
    </>
  );
}

const boxFade = keyframes`
  0% {
    margin-bottom: 15px;
    opacity: 0;
  }
  80% {
    margin-bottom: 3px;
    opacity: 1;
  }
  100% {
    margin-bottom: 0px;
    opacity: 1;
  }
`;

const DayWrap = styled.div`
  display: flex;
  gap: 6px;
  margin: 0 23px 5px 23px;
  animation: ${boxFade} 300ms linear alternate;
`;

const DayBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
`;

const Day = styled.div <{dayOn: boolean}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 4.2rem;
  height: 2.2rem;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  color: #9A8576;
  font-size: 14px;
  font-weight: 500;
  ${({ dayOn }) => (dayOn ? css`color: #C7C7C7;` : 'color: #9A8576;')}
`;

const DayText = styled.p`
  color: #9A8576;
  font-size: 10px;
  font-weight: 400;
`;

const ShopHourBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 5px 0;
`;

const ShopHourInput = styled.input<{ inputOn: boolean }>`
    &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  padding: 0 16px;
  color: #9A8576;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  height: 2.2rem;
  text-align: center;
  ${({ inputOn }) => (inputOn && css`color: #C7C7C7`)};
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
  }
`;

export default ShopHourList;
