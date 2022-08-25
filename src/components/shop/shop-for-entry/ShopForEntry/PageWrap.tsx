import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { PageWrapPropsType } from '@lib/shop/interface';

function PageWrap({
  children, phoneNumCheck, onClick, pageNum,
}: PageWrapPropsType) {
  const pageHeightList: number[] = [926, 1000, 966, 966, 916, 812, 812];

  return (
    <ContentWrap
      height={pageHeightList[pageNum]}
      phoneNumCheck={phoneNumCheck}
      onClick={onClick}
      pageNum={pageNum}
    >
      {children}
    </ContentWrap>
  );
}

const ContentWrap = styled.div<{ height: number, phoneNumCheck: boolean, pageNum: number }>`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #FAF6F2 ;
  color: #C7C7C7;
  font-weight: 500;
  font-size: 14px;
  ${({ phoneNumCheck, height }) => (phoneNumCheck ? css`
  min-height: 1003px` : `min-height: ${height}px;
  `)}
  ${({ pageNum }) => (pageNum === 6 ? css`
  background: #746052` : `background: #FAF6F2 ;
  `)}
`;

export default PageWrap;
