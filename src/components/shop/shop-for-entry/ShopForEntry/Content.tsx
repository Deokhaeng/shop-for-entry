import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ContentPropsType } from '@lib/shop/interface';

function Content({
  children, phoneNumCheck, pageNum,
}: ContentPropsType) {
  const pageHeightList: number[] = [970, 1000, 966, 966, 966, 966, 812];
  const contentHeight: number = pageHeightList[pageNum] - 173;

  return (
    <ContentBox
      height={contentHeight}
      phoneNumCheck={phoneNumCheck}
      pageNum={pageNum}
    >
      {children}
    </ContentBox>
  );
}

const ContentBox = styled.div<{ height: number, phoneNumCheck: boolean, pageNum: number }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  width: 100%;
  ${({ height }) => height && css`
    min-height: ${height}px;
  `}
  ${({ phoneNumCheck, height }) => (phoneNumCheck ? css`
  min-height: 890px` : `min-height: ${height}px;
  `)}
  padding: 0 16px;
  top: 173px;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 14px;
  font-weight: 500;
  & > p {
      margin: 0 0 8px 0;
  }
  ${({ pageNum }) => (pageNum === 6 ? css`
  background: #746052` : `background: #FAF6F2 ;
  `)}
`;

export default Content;
