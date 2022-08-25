import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

function setScreenSize() {
  if (typeof window !== 'undefined') {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
setScreenSize();

function Layout({ children }:any) {
  return (
    <>
      <Head>
        <title>샵 입점신청</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <LayoutWrap>
        {children}
      </LayoutWrap>
    </>
  );
}

const LayoutWrap = styled.div`
  position: relative;
  max-width: 428px;
  min-height: 100vh;
  height:calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  background: #FAF6F2 ;
`;

export default Layout;
