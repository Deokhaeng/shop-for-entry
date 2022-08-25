import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../../elements/shop';
import { MdOutlineClear } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { FacilityListState } from '@/atoms/shop/DetailInfoState';
import useFacilityList from './hooks/useFacilityList';
import { FacilityListPropsType } from '@lib/shop/interface';

function FacilityList({
  shopFacilityList, removeFacility,
}: FacilityListPropsType) {
  const [facilityList, setFacilityList] = useRecoilState(FacilityListState);
  const { data, error } = useFacilityList();

  const handleFacilityState = (facilityName) => {
    const deleteFacility = facilityList.filter((x) => x.facilityName === facilityName);
    deleteFacility[0] = { ...deleteFacility[0], facilityOn: false };
    const newFacilityList = facilityList.filter((f) => f.facilityName !== facilityName);
    newFacilityList.push(deleteFacility[0]);
    newFacilityList.sort((x, y) => x.facilityCd - y.facilityCd);
    setFacilityList(newFacilityList);
  };

  return (
    <ul>
      <FacilityListBox>
        {shopFacilityList
      && shopFacilityList.map((item:any, index:any) => (
        <FacilityWrap key={item.facilityCd}>
          <FacilityBox>
            {item.name}
          </FacilityBox>
          <Button
            Delete
            onClick={() => {
              removeFacility(index);
              handleFacilityState(item.name);
            }}
          >
            <MdOutlineClear />
          </Button>
        </FacilityWrap>
      ))}
      </FacilityListBox>
    </ul>
  );
}

const FacilityListBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  row-gap: 2px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FacilityWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 8px;
  position: relative;
`;

const FacilityBox = styled.div`
  height: 26px;
  color: #9A8576;
  border: 1px solid #9A8576;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  background: #F8F8F8;
  padding: 7px 14px;
`;

export default FacilityList;
