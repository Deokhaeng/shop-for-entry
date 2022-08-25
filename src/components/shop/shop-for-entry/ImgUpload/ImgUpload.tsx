import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdInfo } from 'react-icons/md';
import { Text } from '../../../../elements/shop';
import CoverImages from './CoverImages';
import Thumbnail from './Thumbnail';
import Portfolios from './Portfolios';

function ImgUpload() {
  return (
    <>
      <TopTextBox>
        <Text M>이미지 업로드 Tip !</Text>
        <MdInfo />
      </TopTextBox>
      <TopTextList color="#746052">
        ❶
        <span> 썸네일</span>
        은 샵 리스트 화면에 보여져요.
        <br />
        <p>다른 샵들과 구분되는 우리샵의 예쁜 사진을 넣어보세요!</p>
        ❷
        <span> 커버 이미지</span>
        는 샵 프로필 메인화면 상단에 보여져요.
        <br />
        <p>샵 전경 이미지를 넣는걸 추천드려요!</p>
        ❸
        <span> 포트폴리오</span>
        는 샵 프로필에 보여져요.
        <br />
        <p>포트폴리오를 넣고 유저들의 관심과 신뢰도를 높여보세요!</p>
      </TopTextList>
      <TextBox>
        <Text bold>썸네일</Text>
      </TextBox>
      <Thumbnail />
      <TextBox>
        <Text bold>커버이미지</Text>
      </TextBox>
      <CoverImages />
      <TextBox>
        <Text bold>포트폴리오 업로드</Text>
      </TextBox>
      <Portfolios />
      <TextList
        color="#333333"
        S
      >
        <span>🔖 이미지 등록 시 유의사항</span>
        1. 사진이 등록되지 않을 경우 승인이 보류될 수 있습니다.
        <br />
        2. 목적과 맞지 않는 사진을 업로드하신 경우 승인이 보류 될 수 있습니다.
        <br />
        위 경우  담당자가 연락을 할 수 있습니다.
      </TextList>
    </>
  );
}

const TopTextBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  svg {
    margin-top: 5px;
    margin-left: 3px;
    font-size: 19px;
    color: #C7C7C7;
  }
`;

const TopTextList = styled.div<{ color: string }>`
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  line-height: 20px;
  margin-top: 5px;
  color: black;
  ${({ color }) => css`color: ${color}`}
  & > span {
      font-weight: 700;
  }
  & > p {
      margin-left: 13px;
  }
`;

const TextList = styled.div<{ color: string, S?: boolean }>`
  font-weight: 400;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  color: black;
  font-family: 'Noto Sans KR' !important;
  ${({ color }) => css`color: ${color}`}
  ${({ S }) => (S ? css`font-size: 12px` : 'font-size: 14px')}
  ${({ S }) => (S ? css`margin: 8rem 15px 0 15px` : 'margin: 0')}
  & > span {
      font-weight: 700;
  }
  & > p {
      margin-left: 13px;
  }
`;

const TextBox = styled.div`
  display: flex;
  margin-top: 13px;
  margin-bottom: 5px;
`;

export default ImgUpload;
