import React from 'react';
import styled from '@emotion/styled';
import { DayOptionListPropsType } from '@lib/shop/interface';

function DayOptionList({ handleOnChangeSelectValue }: DayOptionListPropsType) {
  return (
    <>
      <Option
        value="매일"
        onClick={handleOnChangeSelectValue}
      >
        매일
      </Option>
      <Option
        value="주중"
        onClick={handleOnChangeSelectValue}
      >
        주중
      </Option>
      <Option
        value="주말"
        onClick={handleOnChangeSelectValue}
      >
        주말
      </Option>
      <Option
        value="공휴일"
        onClick={handleOnChangeSelectValue}
      >
        공휴일
      </Option>
    </>
  );
}

const Option = styled.li`
  font-size: 14px;
  padding: 8px 12px 7px 12px;
  transition: background-color 0.2s ease-in;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  &:hover {
    background: #333333;
    opacity: 80%;
    color: #FBFBFB;
  }
`;

export default DayOptionList;
