import React from 'react';
import styled from '@emotion/styled';
import Portal from '../Portal';
import DaumPostcode from 'react-daum-postcode';
import { IoCloseOutline } from 'react-icons/io5';
import { keyframes } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { PostCodeModalPropsType } from '@lib/shop/interface';

function PostCodeModal({ onClose }: PostCodeModalPropsType) {
  const { setValue } = useFormContext();
  const handlePostCode = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
    }
    fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');

    setValue('contents.addrCd', data.zonecode);
    setValue('contents.addrRoad', data.roadAddress);
    setValue('contents.addrLot', data.jibunAddress);
    setValue('contents.sido', data.sido);
    setValue('contents.sigungu', data.sigungu);
    setValue('contents.sigunguCd', data.sigunguCode);
    onClose();
  };

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
          <Title>장소 추가</Title>
          <IoCloseOutline
            onClick={() => {
              onClose();
            }}
          />
          <DaumPostcode
            style={{ height: '100vh' }}
            onComplete={handlePostCode}
          />
        </Content>
      </Background>
    </Portal>
  );
}

const boxFade = keyframes`
  0% {
    margin-top: 20rem;
    opacity: 0;
  }
  80% {
    margin-top: 3rem;
    opacity: 1;
  }
  100% {
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
  width: 428px;
  border-radius: 1.5rem;
  background-color: #fff;
  margin-top: 12rem;
  position: relative;
  animation: ${boxFade} 200ms linear alternate;
  svg {
    cursor: pointer;
    position: absolute;
    font-size: 30px;
    top: 1.3rem;
    right: 1.3rem;
    z-index: 1;
  }
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  height: 4.8rem;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #E3E3E3;
`;

export default PostCodeModal;
