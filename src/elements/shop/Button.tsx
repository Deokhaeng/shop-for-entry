import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ButtonPropsType } from '@lib/shop/interface';

function Button({
  bg, children, S, M, L, CircleCheckOff, CircleCheckOffS, AddImage,
  RectangleCheckOff, onClick, DayCheckOff, Day, Delete, AddCircle,
  buttonOn, Facility, width, height, fontSize, addr,
}: ButtonPropsType) {
  if (S) {
    return (
      <SmallButton
        bg={bg}
        onClick={onClick}
        type="button"
        width={width}
        height={height}
        fontSize={fontSize}
        buttonOn={buttonOn}
      >
        {children}
      </SmallButton>
    );
  }
  if (M) {
    return (
      <MiddleBtn
        onClick={onClick}
        type="button"
        bg={bg}
      >
        {children}
      </MiddleBtn>
    );
  }
  if (L) {
    return (
      <LageBtn
        onClick={onClick}
        type="button"
        bg={bg}
      >
        {children}
      </LageBtn>
    );
  }
  if (CircleCheckOff) {
    return (
      <CircleCheckOffBtn
        onClick={onClick}
        type="button"
        buttonOn={buttonOn}
      >
        {children}
      </CircleCheckOffBtn>
    );
  }
  if (CircleCheckOffS) {
    return (
      <SmallCircleCheckOffBtn
        onClick={onClick}
        buttonOn={buttonOn}
        type="button"
      >
        {children}
      </SmallCircleCheckOffBtn>
    );
  }
  if (RectangleCheckOff) {
    return (
      <RectangleCheckOffBtn
        onClick={onClick}
        buttonOn={buttonOn}
        value=""
        type="submit"
      >
        {children}
      </RectangleCheckOffBtn>
    );
  }
  if (DayCheckOff) {
    return (
      <DayCheckOffBtn
        onClick={onClick}
        type="button"
      >
        {Day}
      </DayCheckOffBtn>
    );
  }
  if (Delete) {
    return (
      <DeleteBtn
        onClick={onClick}
        type="button"
      >
        {children}
      </DeleteBtn>
    );
  }
  if (AddImage) {
    return (
      <AddImageBtn
        onClick={onClick}
        type="button"
      >
        {children}
      </AddImageBtn>
    );
  }
  if (AddCircle) {
    return (
      <AddCircleBtn
        onClick={onClick}
        type="button"
      >
        {children}
      </AddCircleBtn>
    );
  }
  if (Facility) {
    return (
      <FacilityButton
        onClick={onClick}
        type="button"
        buttonOn={buttonOn}
      >
        {children}
      </FacilityButton>
    );
  }
  if (addr) {
    return (
      <AddrButton
        onClick={onClick}
        type="button"
      >
        {children}
      </AddrButton>
    );
  }
  return (
    <DefaultBtn
      onClick={onClick}
      type="button"
      buttonOn={buttonOn}
    >
      {children}
    </DefaultBtn>
  );
}

const DefaultBtn = styled.button<{ buttonOn: boolean }>`
  cursor: pointer;
  width: 96px;
  height: 40px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  ${({ buttonOn }) => (buttonOn ? css`background: #9A8576` : 'background: #C7C7C7')};
`;

const SmallButton = styled.button<{ bg: string, width: string, height: string, fontSize: string, buttonOn: boolean }>`
  cursor: pointer;
  color: #FAF6F2 ;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  ${({ width }) => (width ? css`min-width: ${width}` : 'min-width: 6.4rem;')};
  ${({ height }) => (height ? css`height: ${height}` : 'height: 50px')};
  ${({ fontSize }) => (fontSize ? css`font-size: ${fontSize}` : 'font-size: 14px;')};
  ${({ buttonOn }) => (buttonOn ? css`background: #746052` : 'background: #BEAC9F')}
`;

const MiddleBtn = styled.button<{ bg: string }>`
  cursor: pointer;
  width: 287px;
  height: 48px;
  color: #fff;
  background: #E3E3E3;
  border: none;
  border-radius: 8px;
  margin: 25px 0;
  ${({ bg }) => `background: ${bg}`}
`;

const LageBtn = styled.button<{ bg: string }>`
  cursor: pointer;
  width: 100%;
  height: 54px;
  color: #fff;
  background: #E3E3E3;
  border: none;
  border-radius: 10px;
  margin: 25px 0;
  ${({ bg }) => `background: ${bg}`}
`;

const CircleCheckOffBtn = styled.button<{buttonOn:boolean}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #C7C7C7;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  ${({ buttonOn }) => (buttonOn && css`background: #9A8576`)};
  ${({ buttonOn }) => (buttonOn && css`border: none`)};
  svg{
    position: absolute;
    font-size: 12px;
      color: #C7C7C7;
      ${({ buttonOn }) => (buttonOn && css`color: #fff`)};
    }
`;

const SmallCircleCheckOffBtn = styled.button<{buttonOn:boolean}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #C7C7C7;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 7px;
  ${({ buttonOn }) => (buttonOn && css`background: #9A8576`)};
  ${({ buttonOn }) => (buttonOn && css`border: none`)};
  svg{
    position: absolute;
      font-size: 12px;
      color: #C7C7C7;
      ${({ buttonOn }) => (buttonOn && css`color: #fff`)};
    }
`;

const RectangleCheckOffBtn = styled.button<{buttonOn:boolean}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #C7C7C7;
  min-width: 20px;
  height: 20px;
  margin-right: 5px;
  ${({ buttonOn }) => (buttonOn && css`background: #9A8576`)};
  ${({ buttonOn }) => (buttonOn && css`border: none`)};
  svg{
    position: absolute;
      font-size: 14px;
      color: #C7C7C7;
      ${({ buttonOn }) => (buttonOn && css`color: #fff`)};
    }
`;

const DayCheckOffBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #C7C7C7;
  border: none;
  border-radius: 50%;
  width: 33px;
  height: 33px;
  margin-right: 16px;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333333;
  border: none;
  border-radius: 100%;
  width: 10px;
  height: 12px;
  margin-right: 5px;
  opacity: 80%;
  position: absolute;
  top: 4px;
  right: 0;
  :hover {
    opacity: 100%;
  }
  z-index: 1;
  svg{
    position: absolute;
      font-size: 10px;
      color: #fff;
    }
`;

const AddImageBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 76px;
  height: 76px;
  border-radius: 4px;
  border: none;
  color: #9A8576;
  background: #FBFBFB;
`;

const AddCircleBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #BEAC9F;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 7px;
  margin-left: 5px;
  color: #FAF6F2 ;
  font-size: 18px;
  font-weight: 500;
  svg{
      position: absolute;
      font-size: 10px;
      color: #FAF6F2 ;
    }
`;

const FacilityButton = styled.button <{ buttonOn: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 26px;
  border: 1px solid #9A8576;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  padding: 7px 14px;
  ${({ buttonOn }) => (buttonOn ? css`border: 1px solid #9A8576;` : 'border: 1px solid #F8F8F8')};
  ${({ buttonOn }) => (buttonOn ? css`background: #F8F8F8` : 'background: #fff')};
  ${({ buttonOn }) => (buttonOn ? css`color: #9A8576` : 'color: #C7C7C7')};
`;

const AddrButton = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  width: 100%;
  background: transparent;
  padding: 0;
`;

export default Button;
