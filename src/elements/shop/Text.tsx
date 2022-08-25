import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TextPropsType } from '@lib/shop/interface';

function Text({
  children, M, bold, nextText, color, S, margin, XS, validation, message,
}: TextPropsType) {
  if (XS) {
    return (
      <XSmallText color={color}>
        {children}
      </XSmallText>
    );
  }
  if (S) {
    return (
      <SmallText color={color}>
        {children}
      </SmallText>
    );
  }
  if (M) {
    return (
      <MiddleText
        color={color}
        margin={margin}
      >
        {children}
      </MiddleText>
    );
  }
  if (nextText) {
    return (
      <NextText>
        {children}
      </NextText>
    );
  }
  if (validation) {
    return (
      <ValidationText
        message={message}
      >
        {children}
      </ValidationText>
    );
  }
  return (
    <DefaultText
      bold={bold}
      color={color}
    >
      {children}
    </DefaultText>
  );
}

const DefaultText = styled.p<{ bold: boolean, color: string, }>`
  font-size: 14px;
  margin-top: 5px;
  ${({ bold }) => (bold ? css`font-weight: 700` : 'font-weight: 500')}
  ${({ color }) => (color ? css`color: ${color}` : 'color: #746052;')}
`;

const XSmallText = styled.p<{ color: string }>`
  font-size: 10px;
  font-weight: 400;
  margin-top: 5px;
  ${({ color }) => (color ? css`color: ${color}` : 'color: #9A8576;')}
`;

const SmallText = styled.p<{ color: string }>`
  font-size: 13px;
  font-weight: 500;
  margin-top: 5px;
  ${({ color }) => (color ? css`color: ${color}` : 'color: #9A8576;')}
`;

const MiddleText = styled.p<{ color: string, margin: string }>`
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
  ${({ color }) => (color ? css`color: ${color}` : 'color: #9A8576;')}
  ${({ margin }) => (margin ? css`margin: ${margin}` : 'margin: 5px 0 0 0;')}
`;

const NextText = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const ValidationText = styled.p<{ validationRes?: string, message: string }>`
  margin-top: 5px;
  ${({ validationRes }) => (validationRes === 'OK' && css`
  color: #746052;`)}
  ${({ message }) => (message === '사용할 수 있는 아이디입니다.' && css`
  color: #746052;`)}
  ${({ message }) => (message === '인증이 완료되었습니다.' && css`
  color: #746052;`)}
`;

export default Text;
