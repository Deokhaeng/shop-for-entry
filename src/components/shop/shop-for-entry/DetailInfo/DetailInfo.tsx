import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Text } from '../../../../elements/shop';
import Portal from '@/portal/Portal';
import FacilityModal from '@/portal/modals/FacilityModal';
import { useRecoilValue } from 'recoil';
import { ShopHourListOn } from '../../../../atoms/shop/DetailInfoState';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ShopHourTop from './ShopHourTop';
import ShopHourList from './ShopHourList';
import FacilityList from './FacilityList';
import EarlyLateCharge from './EarlyLateCharge';
import useLateTime from './hooks/useLateTime';
import useEarlyTime from './hooks/useEarlyTime';

function DetailInfo() {
  const [modalOn, setModalOn] = useState(false);
  const shopHourListOn = useRecoilValue(ShopHourListOn);
  const {
    register, watch, control, formState: { errors },
  } = useFormContext();
  const { contents } = errors as any;

  const handleModal = () => { setModalOn(!modalOn); };

  const { fields } = useFieldArray({ control, name: 'contents.shopHourList' });

  const {
    fields: fieldsFacility, append: appendFacility, remove: removeFacility,
  } = useFieldArray({ control, name: 'contents.shopFacilityList' });

  const shopFacilityList = watch('contents.shopFacilityList');

  const { lateAmpm, lateHour, lateMinute } = useLateTime();
  const { earlyAmpm, earlyHour, earlyMinute } = useEarlyTime();

  return (
    <>
      <TopTextBox>
        <span>*</span>
        <Text bold>샵 상세소개</Text>
      </TopTextBox>
      <DescriptionBox>
        <DescriptionTopBox />
        <InputTextarea
          placeholder="샵 상세소개를 입력해주세요.&#13;&#10;입력하신 내용은 샵 프로필에 반영됩니다. (최대 2,000자)"
          {...register('contents.description')}
          maxLength={2000}
        />
        <DescriptionText>
          {watch('contents.description')?.length}
          자 | 2,000자
        </DescriptionText>
      </DescriptionBox>
      {contents?.description && (<Text validation>{ contents.description?.message}</Text>)}
      <TextBox>
        <span>*</span>
        <Text bold>운영정보</Text>
      </TextBox>
      <ShopHourTop />
      { shopHourListOn && (<ShopHourList />)}
      <BottomTextBox>
        <Text bold>얼리/레이트 차지 적용 기준시간</Text>
      </BottomTextBox>
      <EarlyLateCharge />
      { watch('contents.earlyTime').length === 5
      && watch('contents.lateTime').length === 5
      && watch('contents.earlyPrice').length > 0
      && watch('contents.earlyPrice') !== '0'
        && (
        <Text
          XS
          color="#999999"
        >
          {' '}
          {earlyAmpm}
          {' '}
          {earlyHour}
          시
          {' '}
          {earlyMinute}
          {earlyMinute && '분'}
          {' '}
          이전,
          {' '}
          {lateAmpm}
          {' '}
          {lateHour}
          시
          {' '}
          {lateMinute}
          {lateMinute && '분'}
          {' '}
          이후는
          {' '}
          {watch('contents.earlyPrice')}
          원의 얼리/레이트 차지 비용이 추가됩니다.
        </Text>
        )}
      { watch('contents.earlyTime').length === 5
      && !watch('contents.lateTime')
      && watch('contents.earlyPrice').length > 0
      && watch('contents.earlyPrice') !== '0'
        && (
        <Text
          XS
          color="#999999"
        >
          {' '}
          {earlyAmpm}
          {' '}
          {earlyHour}
          시
          {' '}
          {earlyMinute}
          {earlyMinute && '분'}
          {' '}
          이전은
          {' '}
          {watch('contents.earlyPrice')}
          원의 얼리차지 비용이 추가됩니다.
        </Text>
        )}
      { !watch('contents.earlyTime')
      && watch('contents.lateTime').length === 5
      && watch('contents.earlyPrice').length > 0
      && watch('contents.earlyPrice') !== '0'
        && (
        <Text
          XS
          color="#999999"
        >
          {' '}
          {lateAmpm}
          {' '}
          {lateHour}
          시
          {' '}
          {lateMinute}
          {lateMinute && '분'}
          {' '}
          이후는
          {' '}
          {watch('contents.earlyPrice')}
          원의 레이트차지 비용이 추가됩니다.
        </Text>
        )}
      { (watch('contents.earlyTime').length === 5
      || watch('contents.lateTime').length === 5)
      && !watch('contents.earlyPrice') && (
      <Text
        XS
        color="#999999"
      >
        금액을 입력해주세요.
      </Text>
      )}
      <BottomTextBox>
        <Text bold>시설정보</Text>
        <Button
          AddCircle
          onClick={handleModal}
        >
          +
        </Button>
      </BottomTextBox>
      <FacilityList
        shopFacilityList={shopFacilityList}
        removeFacility={removeFacility}
      />
      <Portal>
        {modalOn && (
        <FacilityModal
          onClose={handleModal}
        />
        )}
      </Portal>
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

const TextBox = styled.div`
  display: flex;
  margin: 13px 0 5px 0;
  & > span {
      margin-top: 5px;
      color: #D55B42;
  }
`;

const BottomTextBox = styled.div`
  display: flex;
  margin-top: 19px;
  box-sizing: border-box;
  width: 100%;
`;

const DescriptionBox = styled.div`
  border-radius: 8px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  padding: 0 0.5rem 0 1rem;
`;

const DescriptionTopBox = styled.div`
  border-radius: 8px;
  background: #FBFBFB;
  width: 100%;
  height: 0.9rem;
`;

const InputTextarea = styled.textarea`
    &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  background: #FBFBFB;
  border-radius: 8px 8px 0 0;
  margin-top: 5px;
  padding: 0 1rem 0 0;
  height: 4rem;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  resize: none;
  margin:0;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const DescriptionText = styled.div`
  text-align: right;
  padding-top: 0.5rem;
  padding-right: 0.8rem;
  border-radius: 8px;
  width: 100%;
  height: 1.8rem;
  margin:0;
  background: #FBFBFB;
  font-size: 0.75rem;
  font-weight: 500;
  color: #C7C7C7;
`;

export default DetailInfo;
