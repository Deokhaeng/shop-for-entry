import React from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIos } from 'react-icons/md';
import { FirstConsentType } from '@lib/shop/interface';

function FirstConsent({ handleFirstConsent, firstState, firstOn }: FirstConsentType) {
  return (
    <ConsentWrap>
      <BackBtn onClick={handleFirstConsent}>
        <MdArrowBackIos />
      </BackBtn>
      <Title>[필수] 이용약관</Title>
      <Content><div>약관 동의 내용을 작성해주세요</div></Content>
      <FooterBox
        onClick={() => {
          handleFirstConsent();
          if (firstState === false) { firstOn(); }
        }}
      >
        동의하기
      </FooterBox>
    </ConsentWrap>
  );
}

const ConsentWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #FAF6F2 ;
  color: #9A8576;
`;

const BackBtn = styled.div`
  cursor: pointer;
  svg{
    font-size: 20px;
      color: #9A8576;
      position: absolute;
      left: 20px;
      top: 62px;
  }
`;

const Title = styled.div`
  padding-top: 64px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  gap: 5px;
  position: absolute;
  width: 100%;
  height: 193px;
  top: 135px;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 14px;
  font-weight: 500;
`;

const FooterBox = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  min-height: 94px;
  padding-top: 16px;
  padding-bottom: 59px;
  width: 100%;
  background: #746052;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export default FirstConsent;
