import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';
import { AuthenticationMsg, Time } from '../../../../atoms/shop/SignUpState';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import { TimerPropsType } from '@lib/shop/interface';

function Timer({ validationRes }:TimerPropsType) {
  const [time, setTime] = useRecoilState(Time);
  const pageNum = useRecoilValue(PageNumState);
  const resetAuthenticationMsg = useResetRecoilState(AuthenticationMsg);
  const handleAuthenticationMsg = useSetRecoilState(AuthenticationMsg);

  useEffect(() => {
    const Count = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    const clear = () => {
      clearInterval(Count);
    };

    resetAuthenticationMsg();
    if (time === 0) {
      clear();
      handleAuthenticationMsg('인증번호 입력 시간이 만료되었습니다.');
    }
    if (validationRes === 'OK') {
      handleAuthenticationMsg('인증이 완료되었습니다.');
      clear();
    }
    // 회원가입 페이지를 벗어날 때를 위해
    if (pageNum > 0) {
      clear();
    }

    return () => clear();
  }, [time]);

  const timeFormat = (time: number) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `0${m}:${s}`;
  };

  return (
    <TimerWrap validationRes={validationRes}>
      {timeFormat(time)}
    </TimerWrap>
  );
}

const TimerWrap = styled.div <{ validationRes: string }>`
  position: absolute;
  top: 43%;
  right: 5%;
  color: #574030;
  ${({ validationRes }) => (validationRes === 'OK' && css`display: none`)}
`;

export default Timer;
