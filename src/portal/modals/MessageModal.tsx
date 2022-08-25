import React from 'react';
import styled from '@emotion/styled';
import Portal from '../Portal';
import Button from '@/elements/shop/Button';
import { keyframes } from '@emotion/react';
import { MessageModalPropsType } from '@lib/shop/interface';

function MessageModal({ onClose, modalMessage }: MessageModalPropsType) {
  return (
    <Portal>
      <Background
        onClick={() => {
          onClose();
        }}
      >
        <Content
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LogoImgBox />
          <TextList color="#746052">
            {modalMessage}
            <br />
          </TextList>
          <ButtonBox>
            <Button
              M
              bg="#746052"
              onClick={() => {
                onClose();
              }}
            >
              확인
            </Button>
          </ButtonBox>
        </Content>
      </Background>
    </Portal>
  );
}

const boxFade = keyframes`
  0% {
    margin-top: 15px;
    opacity: 0;
  }
  80% {
    margin-top: 3px;
    opacity: 1;
  }
  100% {
    margin-top: 0px;
    opacity: 1;
  }
`;

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
`;

const Content = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  height: 419px;
  max-width: 343px;
  border-radius: 2%;
  background-color: #fff;
  position: relative;
  animation: ${boxFade} 180ms linear alternate;
`;

const LogoImgBox = styled.div`
  padding: 0 6.2rem 0.5rem 6rem;
  margin-top: 3.5rem;
  width: 30rem;
`;

const TextList = styled.div<{ color: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 31px;
  color: #746052;
  text-align: center;
  margin-bottom: 6rem;
  white-space:pre-wrap
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 0;
`;

export default MessageModal;
