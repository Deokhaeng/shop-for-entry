import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdArrowBackIos } from 'react-icons/md';
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { HeaderPropsType } from '@lib/shop/interface';
import { ModalMessage, ShopEntryModalOn } from '@/atoms/shop/ModalState';
import useResetState from '@components/shop/Terms/hooks/useResetState';

function Header({
  pageNum, handlePrevPageNum,
}: HeaderPropsType) {
  const barTextList: string[] = ['회원가입', '기본정보', '상세정보', '정산정보', '이미지', '동의사항', '신청 완료'];
  const percent = `${(pageNum / 6) * 100}%`;
  const setModalOn = useSetRecoilState(ShopEntryModalOn);
  const [modalMessage, setModalMessage] = useRecoilState(ModalMessage);
  const { resetSignUpState, resetShopEntryState } = useResetState();

  return (
    <HeaderWrap>
      { pageNum === 0 ? (
        <Link
          href={{ pathname: '/shop/terms' }}
        >
          <BackBtn
            pageNum={pageNum}
            percent={percent}
            onClick={() => {
              if (modalMessage === '입력한 값의 형식이 맞지 않습니다.') {
                setModalOn(true);
              } else {
                resetSignUpState();
                resetShopEntryState();
                setModalMessage('');
              }
            }}
          >
            <MdArrowBackIos />
          </BackBtn>
        </Link>
      ) : (
        <BackBtn
          percent={percent}
          pageNum={pageNum}
          onClick={() => {
            if (modalMessage === '입력한 값의 형식이 맞지 않습니다.') {
              setModalOn(true);
            } else {
              handlePrevPageNum();
              resetSignUpState();
              setModalMessage('');
            }
          }}
        >
          <MdArrowBackIos />
        </BackBtn>
      )}
      <Title percent={percent}> 샵 입점 신청</Title>
      <BackgroundBar>
        <PercentBar percent={percent} />
        <RowBox>
          <ProgressDot percent={percent} />
          <StepName percent={percent}>{barTextList[pageNum]}</StepName>
        </RowBox>
      </BackgroundBar>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  width: 100%;
  padding-top: 63px;
`;

const BackBtn = styled.div<{ percent: string, pageNum: number }>`
  cursor: pointer;
  svg{
    font-size: 20px;
    position: absolute;
    left: 20px;
    top: 62px;
    ${({ percent }) => (percent === '100%' ? css`color: #fff` : 'color: #9A8576;')}
  }
  ${({ pageNum }) => ((pageNum === 1 || pageNum === 6) && css`display: none`)}
`;

const Title = styled.div<{ percent: string }>`
  margin: 10;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  ${({ percent }) => (percent === '100%' ? css`color: #fff` : 'color: #9A8576;')}
`;

const BackgroundBar = styled.div`
  background: #e3e3e3;
  width: 77%;
  margin: 30px auto;
  height: 1px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const PercentBar = styled.div<{ percent: string }>`
  width: ${({ percent }) => percent};
  height: 2px;
  transition: 0.1s;
  ${({ percent }) => (percent === '100%' ? css`background: #fff` : 'background: #9A8576;')}
`;

const ProgressDot = styled.div<{ percent: string }>`
  width: 10px;
  height: 10px;
  border-radius: 40px;
  margin: 0;
  ${({ percent }) => (percent === '100%' ? css`background: #fff` : 'background: #9A8576;')}
`;

const StepName = styled.p<{ percent: string }>`
  position: absolute;
  white-space: nowrap;
  top: 15px;
  font-weight: 700;
  color: #9a8576;
  font-size: 12px;
  ${({ percent }) => (percent === '100%' ? css`color: #fff` : 'color: #9A8576;')}
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default Header;
