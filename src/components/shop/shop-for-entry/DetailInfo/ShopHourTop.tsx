import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import DayOptionList from './DayOptionList';
import { Button } from '../../../../elements/shop';
import { BsCaretDown } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ShopHourListOn, ShowOptions } from '@/atoms/shop/DetailInfoState';
import { useFormContext } from 'react-hook-form';
import { ShopHourList } from '@/atoms/shop/ShopForEntryState';

function ShopHourTop() {
  const [currentValue, setCurrentValue] = useState('매일');
  const [showOptions, setShowOptions] = useRecoilState(ShowOptions);
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [shopHourListOn, setShopHourListOn] = useRecoilState(ShopHourListOn);
  const defaultShopHourList = useRecoilValue(ShopHourList);
  const {
    setValue, getValues, watch,
  } = useFormContext();
  const shopHourList = watch('contents.shopHourList');

  const showShopHourList = () => {
    setShopHourListOn(!shopHourListOn);
    if (shopHourList.length === 0) { setValue('contents.shopHourList', defaultShopHourList); }
  };

  const handleOnChangeSelectValue = (e: any) => {
    // 선택한 value값
    setCurrentValue(e.target.getAttribute('value'));
  };

  const changeStartTime = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStartTime(value);
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (value.length > 0) {
      const startTime = value.replace(/[^0-9]/g, '');
      setStartTime(startTime);
    }
    if (value.length === 4) {
      let startTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      if (!pattern.test(startTime)) { startTime = ''; }
      setStartTime(startTime);
    }
    if (value.length === 5) {
      const startTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      setStartTime(startTime);
    }
  };

  const changeEndTime = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEndTime(value);
    const pattern = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (value.length > 0) {
      const endTime = value.replace(/[^0-9]/g, '');
      setEndTime(endTime);
    }
    if (value.length === 4) {
      let endTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      if (!pattern.test(endTime)) { endTime = ''; }
      setEndTime(endTime);
    }
    if (value.length === 5) {
      const endTime = value.replace(/(\d{2})(\d{2})/, '$1:$2');
      setEndTime(endTime);
    }
  };

  const changeDay = (endTime:string, startTime:string) => {
    if (currentValue === '매일' && startTime) {
      watch('contents.shopHourList').map((_x, index) => setValue(`contents.shopHourList.${index}`, { ...getValues(`contents.shopHourList.${index}`), startTime }));
    }

    if (currentValue === '주중' && startTime) {
      watch('contents.shopHourList').map((_x, index) => index < 5 && setValue(`contents.shopHourList.${index}`, { ...getValues(`contents.shopHourList.${index}`), startTime }));
    }

    if (currentValue === '주말' && startTime) {
      watch('contents.shopHourList').map((_x, index) => (index === 5 || index === 6) && setValue(`contents.shopHourList.${index}`, { ...getValues(`contents.shopHourList.${index}`), startTime }));
    }

    if (currentValue === '공휴일' && startTime) {
      setValue('contents.shopHourList.7', { ...getValues('contents.shopHourList.7'), startTime });
    }

    if (currentValue === '매일' && endTime) {
      watch('contents.shopHourList').map((_x, index) => setValue(`contents.shopHourList.${index}`, { ...getValues(`contents.shopHourList.${index}`), endTime }));
    }

    if (currentValue === '주중' && endTime) {
      watch('contents.shopHourList').map((_x, index) => index < 5 && setValue(`contents.shopHourList.${index}`, { ...getValues(`contents.shopHourList.${index}`), endTime }));
    }

    if (currentValue === '주말' && endTime) {
      watch('contents.shopHourList').map((_x, index) => (index === 5 || index === 6) && setValue(`contents.shopHourList.${index}`, { ...getValues(`contents.shopHourList.${index}`), endTime }));
    }

    if (currentValue === '공휴일' && endTime) {
      setValue('contents.shopHourList.7', { ...getValues('contents.shopHourList.7'), endTime });
    }
  };

  return (
    <ShopHourListWrap>
      <SelectBox
        onClick={(e) => {
          if (shopHourListOn) {
            setShowOptions((prev) => !prev);
            e.stopPropagation();
          }
        }}
        currentValue={currentValue}
        shopHourListOn={shopHourListOn}
      >
        <Label shopHourListOn={shopHourListOn}>{currentValue}</Label>
        {shopHourListOn && <BsCaretDown />}
        <SelectOptions
          show={showOptions}
          id="optionList"
        >
          <DayOptionList handleOnChangeSelectValue={handleOnChangeSelectValue} />
        </SelectOptions>
      </SelectBox>
      <ShopHourInput
        type="text"
        placeholder="09:00"
        value={startTime || ''}
        onChange={changeStartTime}
        inputOn={!shopHourListOn}
        disabled={!shopHourListOn}
        maxLength={5}
      />
      <ShopHourInput
        type="text"
        placeholder="21:00"
        value={endTime || ''}
        onChange={changeEndTime}
        inputOn={!shopHourListOn}
        disabled={!shopHourListOn}
        maxLength={5}
      />
      <Button
        S
        buttonOn={endTime.length > 0 || startTime.length > 0}
        width="4.1rem"
        fontSize="0.8rem"
        onClick={() => {
          if (shopHourListOn) {
            changeDay(endTime, startTime);
          }
          if (shopHourListOn === false) {
            showShopHourList();
          }
        }}
      >
        {shopHourListOn ? '일괄변경' : '추가'}
      </Button>
    </ShopHourListWrap>
  );
}

const ShopHourListWrap = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 6px;
  color: #C7C7C7 !important;
`;

// DropDown CSS
const SelectBox = styled.div<{ currentValue: string, shopHourListOn: boolean }>`
  position: relative;
  align-self: center;
  display: inline-flex;
  min-width: 4.8rem;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  padding-left: 10px;
  /* margin-right: 6px; */
  align-items: center;
  ${({ currentValue }) => (currentValue === '요일' ? 'color: #C7C7C7;' : 'color: #9A8576;')};
  ${({ shopHourListOn }) => (shopHourListOn && 'cursor: pointer;')};
  svg {
    position: absolute;
    top: 16px;
    right: 6px;
    color: #C7C7C7;
    font-size: 15px;
  }
`;

const Label = styled.label<{ shopHourListOn: boolean }>`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
  ${({ shopHourListOn }) => (shopHourListOn && 'cursor: pointer;')};
  ${({ shopHourListOn }) => (shopHourListOn ? 'color: #9A8576;' : 'color: #C7C7C7;')};
  ${({ shopHourListOn }) => (shopHourListOn ? 'margin-left: 4px;' : 'margin-left: 0.6rem;')};
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 55px;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  padding: 0;
  border-radius: 8px;
  border: ${(props) => (props.show ? '1px solid #F0F0F0' : 'none')};
  background: #FBFBFB;
  color: #9A8576;
  z-index: 2;
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
  height: 50px;
  text-align: center;
  ::placeholder {
      color: #C7C7C7;
      /* ${({ inputOn }) => (inputOn && css`color: #C7C7C7`)}; */
      font-size: 14px;
      font-weight: 500;
      text-align: center;
  }
`;

export default ShopHourTop;
