import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Text } from '../../../../elements/shop';
import { useRecoilValue } from 'recoil';
import { ShopCode } from '@/atoms/shop/ShopForEntryState';
import useCopyClipBoard from './hooks/useCopyClipBorad';
import { IoCopyOutline } from 'react-icons/io5';

function Completion() {
  const shopCode = useRecoilValue(ShopCode);
  const [_isCopy, onCopy] = useCopyClipBoard();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  return (
    <>
      <LogoImgBox />
      <TextList color="#746052">
        샵 입점 신청이 완료되었어요
        <br />
        의 파트너가 되어주셔서
        <br />
        감사합니다!
        <br />
      </TextList>
      <TextBox>
        <ShopCodeBox>
          <Text
            M
            color="#FAF6F2 "
          >
            샵 코드 :
            {' '}
            {shopCode}
          </Text>
          <CopyIcon onClick={() => { handleCopyClipBoard(shopCode); }}>
            <IoCopyOutline />
          </CopyIcon>
        </ShopCodeBox>
        <Text
          S
          color="#FAF6F2 "
        >
          샵 코드를 입력하고 샵소속 아티스트를 추가해보세요!
        </Text>
      </TextBox>
      <Link
        href={{ pathname: '/artist/terms' }}
      >
        <FooterBox>
          <Footer>
            🎨 아티스트 등록하러 가기
          </Footer>
        </FooterBox>
      </Link>
    </>
  );
}

const LogoImgBox = styled.div`
  margin-top: 230px;
  padding: 0 100px;
`;

const TextList = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  width: 283px;
  line-height: 31px;
  margin: 20px auto 0 auto;
  color: #fff;
  text-align: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 23px auto;
  text-align: center;
`;

const ShopCodeBox = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: 0 auto;
`;

const CopyIcon = styled.div`
  cursor: pointer;
  svg {
    transform: rotate(270deg);
    font-size: 1.4rem;
    margin-left: 0.3rem;
  }
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

const Footer = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 78px;
`;

export default Completion;
