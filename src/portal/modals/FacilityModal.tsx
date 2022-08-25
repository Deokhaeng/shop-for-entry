import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Portal from '../Portal';
import Button from '@/elements/shop/Button';
import Text from '@/elements/shop/Text';
import { IoCloseOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { FacilityListState, FacilityListform } from '../../atoms/shop/DetailInfoState';
import FacilityBtn from '@components/shop/shop-for-entry/DetailInfo/FacilityBtn';
import { useFormContext } from 'react-hook-form';
import { keyframes } from '@emotion/react';
import { FacilityModalType } from '@lib/shop/interface';

function FacilityModal({
  onClose,
}: FacilityModalType) {
  const [saveButtonOn, setSaveButtonOn] = useState(false);
  const [facilityList, _setFacilityList] = useRecoilState(FacilityListState);
  const [facilityListform, setFacilityListform] = useRecoilState(FacilityListform);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (facilityList !== null) {
      const facilityListform = facilityList.filter((x) => x.facilityOn === true);
      const newFacilityListform = [];
      facilityListform.map((x) => newFacilityListform.push({
        name: x.name, facilityCd: x.facilityCd,
      }));
      setFacilityListform(newFacilityListform);
    }
  }, [facilityList]);

  useEffect(() => {
    if (facilityListform.length === 0) {
      setSaveButtonOn(false);
    } else {
      setSaveButtonOn(true);
    }
  }, [facilityListform]);

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
          <Title>
            <Text
              M
              margin="0"
              color="#746052"
            >
              시설정보
            </Text>
            <IoCloseOutline
              onClick={() => {
                onClose();
              }}
            />
          </Title>
          <FacilityListBox>
            {facilityList
            && facilityList?.map((x, i) => (
              <FacilityBtn
                key={x.facilityCd}
                props={x}
                index={i}
              />
            ))}
          </FacilityListBox>
          <ButtonBox>
            <Button
              buttonOn={saveButtonOn}
              onClick={() => {
                onClose();
                setValue('contents.shopFacilityList', facilityListform);
              }}
            >
              저장하기
            </Button>
          </ButtonBox>
        </Content>
      </Background>
    </Portal>
  );
}

const boxFade = keyframes`
  0% {
    margin-top: 15px;
    opacity: 0;
  }
  80% {
    margin-top: 3px;
    opacity: 1;
  }
  100% {
    margin-top: 0px;
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
  background: transparent;
`;

const Content = styled.div`
  display: inline-flex;
  flex-direction: column;
  z-index: 2;
  min-height: 21rem;
  max-width: 343px;
  background-color: #fff;
  padding: 19px 22px 22px 22px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: #FAF6F2 ;
  position: relative;
  animation: ${boxFade} 150ms linear alternate;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  svg {
    cursor: pointer;
    position: absolute;
    top: 14px;
    right: 14px;
    color: #746052;
    font-size: 20px;
  }
`;

const FacilityListBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 9px;
  row-gap: 2px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2px;
`;

const ButtonBox = styled.div`
  margin-left: auto;
  margin-top: auto;
`;

export default FacilityModal;
