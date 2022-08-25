import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../../../elements/shop';
import { ConsentListPropsType } from '@lib/shop/interface';

function ConsentList({
  handleFirstConsent, handleSecondConsent, handleThirdConsent, handleFourthConsent, handleContinue,
  allOn, firstOn, secondOn, thirdOn, fourthOn,
  allState, firstState, secondState, thirdState, fourthState,
}: ConsentListPropsType) {
  return (
    <>
      <ConsentWrap>
        <ConsentBox>
          <Button
            CircleCheckOff
            onClick={allOn}
            buttonOn={allState}
          >
            <FaCheck />
          </Button>
          <span>약관에 모두 동의</span>
        </ConsentBox>
      </ConsentWrap>
      <ConsentListWrap>
        <ConsentListBox>
          <Button
            CircleCheckOff
            onClick={firstOn}
            buttonOn={firstState}
          >
            <FaCheck />
          </Button>
          <p>[필수] 이용약관</p>
          <ArrowBtn onClick={handleFirstConsent}><MdKeyboardArrowRight /></ArrowBtn>
        </ConsentListBox>
        <ConsentListBox>
          <Button
            CircleCheckOff
            onClick={secondOn}
            buttonOn={secondState}
          >
            <FaCheck />
          </Button>
          <p>[필수] 개인정보 처리방침</p>
          <ArrowBtn onClick={handleSecondConsent}><MdKeyboardArrowRight /></ArrowBtn>
        </ConsentListBox>
        <ConsentListBox>
          <Button
            CircleCheckOff
            onClick={thirdOn}
            buttonOn={thirdState}
          >
            <FaCheck />
          </Button>
          <p>[필수] 만 14세 이상 가입</p>
          <ArrowBtn onClick={handleThirdConsent}><MdKeyboardArrowRight /></ArrowBtn>
        </ConsentListBox>
        <ConsentListBox>
          <Button
            CircleCheckOff
            onClick={fourthOn}
            buttonOn={fourthState}
          >
            <FaCheck />
          </Button>
          <p>[선택] 마케팅 수신동의</p>
          <ArrowBtn onClick={handleFourthConsent}><MdKeyboardArrowRight /></ArrowBtn>
        </ConsentListBox>
      </ConsentListWrap>
      <TextBottom onClick={handleContinue}>📝 기존에 진행하던 건이 있어요!</TextBottom>
      <Link
        href={firstState && secondState && thirdState ? { pathname: '/shop/signup' } : { pathname: '/shop/terms' }}
      >
        <FooterBox
          firstState={firstState}
          secondState={secondState}
          thirdState={thirdState}
        >
          동의하고 샵 입점 신청하기
        </FooterBox>
      </Link>
    </>
  );
}

const ConsentWrap = styled.div`
  height: 80px;
  margin: 46px 15px 15px 15px;
  border-bottom: 1px solid #f0f0f0;
`;

const ConsentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 58px;
  background: #fff; 
  color: #746052;
  padding: 20px;
  border-radius: 8px;
  font-weight: 700;
  & > span {
    font-size: 14px;
  }
`;

const ConsentListWrap = styled.div`
  margin-top: 25px;
`;

const ConsentListBox = styled.div`
  padding: 0 28px 28px 28px;
  font-size: 14px;
  display: flex;
  align-items: center;
  & > p {
    margin-top: 2px;
  }
`;

const ArrowBtn = styled.div`
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  right: 24px;
`;

const TextBottom = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 7rem;
  text-align: center;
  text-decoration: underline;
  font-size: 12px;
`;

const FooterBox = styled.div<{ firstState: boolean, secondState: boolean, thirdState: boolean }>`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  min-height: 94px;
  padding-top: 16px;
  padding-bottom: 59px;
  width: 100%;
  background: #D1D1D1;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  ${({ firstState, secondState, thirdState }) => (firstState === true && secondState === true && thirdState === true) && css`
    background: #BEAC9F;
  `}
`;

export default ConsentList;
