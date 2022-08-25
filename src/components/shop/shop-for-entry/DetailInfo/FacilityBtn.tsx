import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@/elements/shop';
import { useRecoilState } from 'recoil';
import { FacilityListState } from '@/atoms/shop/DetailInfoState';
import { FacilityBtnPropsType } from '@lib/shop/interface';

function FacilityBtn({
  props, index,
}: FacilityBtnPropsType) {
  const { facilityName, facilityOn } = props;
  const [facilityList, setFacilityList] = useRecoilState(FacilityListState);

  const newFacilityList = [...facilityList];
  const handleFacilityBtn = () => {
    newFacilityList[index] = {
      ...newFacilityList[index], facilityOn: !facilityOn, name: facilityName,
    };
    setFacilityList(newFacilityList);
  };

  return (
    <FacilityWrap>
      <Button
        Facility
        buttonOn={facilityOn}
        onClick={() => {
          handleFacilityBtn();
        }}
      >
        {facilityName}
      </Button>
    </FacilityWrap>
  );
}

const FacilityWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 8px;
  position: relative;
`;

export default FacilityBtn;
