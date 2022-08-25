import React from 'react';
import styled from '@emotion/styled';
import { FaCheck } from 'react-icons/fa';
import { Button, Text } from '../../../../elements/shop';
import { useRecoilState } from 'recoil';
import { AreementFirstOn, AreementsSecondOn } from '../../../../atoms/shop/AgreementsState';

function Agreements() {
  const [firstOn, setFirstOn] = useRecoilState(AreementFirstOn);
  const [secondOn, setSecondOn] = useRecoilState(AreementsSecondOn);

  const handleFirstOn = () => {
    setFirstOn(!firstOn);
  };
  const handleSecondOn = () => {
    setSecondOn(!secondOn);
  };

  return (
    <>
      <TopTextBox>
        <span>*</span>
        <Text M>
          샵 프로필 제작 동의 및 2022 프로모션 동의
        </Text>
      </TopTextBox>
      <TextList color="#746052">
        1. 샵 입점 신청 시 제공해 주신 정보 및 이미지는  샵
        <br />
        <p>프로필 제작에 사용됩니다.</p>
        <br />
        2. 2022년 프로모션으로  앱의 샵 주문으로 예약되는
        <br />
        <p>수수료는 없습니다. 단, 결제 시 발생하는 PG(카드결제)</p>
        <p>수수료만 3.5% (부가세 별도) 부과됩니다.</p>
      </TextList>
      <CheckListBox>
        <CheckBox>
          <Button
            CircleCheckOffS
            onClick={handleFirstOn}
            buttonOn={firstOn}
          >
            <FaCheck />
          </Button>
          [필수] 프로필 제작 이미지 제공과 사용에 동의합니다.
        </CheckBox>
        <CheckBox>
          <Button
            CircleCheckOffS
            onClick={handleSecondOn}
            buttonOn={secondOn}
          >
            <FaCheck />
          </Button>
          [필수] 2022년 프로포션을 이해했고 동의합니다.
        </CheckBox>
      </CheckListBox>
    </>
  );
}

const TopTextBox = styled.div`
  display: flex;
  & > span {
      margin-top: 5px;
      color: #D55B42;
  }
`;

const TextList = styled.div`
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  line-height: 20px;
  margin-top: 20px;
  color: #746052;
  padding-bottom: 20px;
  border-bottom: 1px solid #9A8576;
  & > p {
      margin-left: 13px;
  }
`;

const CheckListBox = styled.div`
  margin-top: 1px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  color: #746052;
  font-weight: 500;
  padding-top: 12px;
`;

export default Agreements;
