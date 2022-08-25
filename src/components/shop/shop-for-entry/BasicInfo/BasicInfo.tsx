import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaCheck } from 'react-icons/fa';
import { Input, Button, Text } from '../../../../elements/shop';
import Portal from '@/portal/Portal';
import PostCodeModal from '@/portal/modals/PostCodeModal';
import { FiSearch } from 'react-icons/fi';
import Map from './Map';
import { useFormContext } from 'react-hook-form';

function BasicInfo() {
  const [modalOn, setModalOn] = useState(false);
  const {
    register, setValue, getValues, watch, formState: { errors },
  } = useFormContext();
  const { contents } = errors as any;
  const [makeUpOn, setMakeUpOn] = useState(watch('contents.makeUp'));
  const [personalOn, setPersonalOn] = useState(watch('contents.personalColor'));

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const handleMakeUpOn = () => {
    setMakeUpOn(!makeUpOn);
  };
  const handlePersonalOn = () => {
    setPersonalOn(!personalOn);
  };

  const handleHomepage = () => {
    const value = watch('contents.homepage');
    if (value?.length > 0) {
      setValue('contents.homepage', value.replace(/[^0-9a-zA-Z/.:]/g, ''));
    }
  };

  const handlePhoneMain = () => {
    const value = watch('contents.phoneMain');
    if (value?.length > 0) {
      setValue('contents.phoneMain', value.replace(/[^0-9-]/g, ''));
    }
  };

  useEffect(() => {
    handleHomepage();
  }, [watch('contents.homepage')]);

  useEffect(() => {
    handlePhoneMain();
  }, [watch('contents.phoneMain')]);

  return (
    <>
      <TopTextBox>
        <span>*</span>
        <Text bold>상호명</Text>
      </TopTextBox>
      <Input
        M
        placeholder="상호명을 입력해주세요."
        register={{ ...register('contents.name') }}
      />
      {contents?.name && (<Text validation>{ contents.name?.message}</Text>)}
      <TextBox>
        <span>*</span>
        <Text bold>샵 분류 (중복선택 가능)</Text>
      </TextBox>
      <BtnBox>
        <Button
          RectangleCheckOff
          onClick={() => {
            handleMakeUpOn();
            setValue('contents.makeUp', !makeUpOn);
          }}
          buttonOn={watch('contents.makeUp')}
        >
          <FaCheck />
        </Button>
        <p>메이크업</p>
        <Button
          RectangleCheckOff
          onClick={() => {
            handlePersonalOn();
            setValue('contents.personalColor', !personalOn);
          }}
          buttonOn={watch('contents.personalColor')}
        >
          <FaCheck />
        </Button>
        <p>퍼스널컬러</p>
      </BtnBox>
      <TextBox>
        <span>*</span>
        <Text bold>샵 주소</Text>
      </TextBox>
      <Button
        addr
        onClick={() => { handleModal(); }}
      >
        <Input
          M
          map
          placeholder="우편번호 찾기"
          register={{ ...register('contents.addrRoad') }}
          // disabled
        />
        <SearchIcon><FiSearch /></SearchIcon>
      </Button>
      <div style={{ height: '5px' }} />
      <Input
        M
        placeholder="상세주소 입력"
        register={{ ...register('contents.addrDetail') }}
      />
      {contents?.addrDetail && (<Text validation>{ contents.addrDetail?.message}</Text>)}
      <Map address={getValues('contents.addrRoad')} />
      <TextBox>
        <Text bold>찾아오는 길</Text>
      </TextBox>
      <Input
        M
        placeholder="양재역 5번출구 500m"
        register={{ ...register('contents.way') }}
      />
      {contents?.way && (<Text validation>{ contents.way?.message}</Text>)}
      <TextBox>
        <Text bold>샵 홈페이지</Text>
      </TextBox>
      <Input
        M
        placeholder="www.valla.kr"
        register={{ ...register('contents.homepage') }}
      />
      {contents?.homepage && (<Text validation>{ contents.homepage?.message}</Text>)}
      <TextBox>
        <Text bold>샵 연락처</Text>
      </TextBox>
      <Input
        M
        placeholder="0 2 - 1 2 3 4 - 5 6 8 7"
        register={{ ...register('contents.phoneMain') }}
      />
      {contents?.phoneMain && (<Text validation>{ contents.phoneMain?.message}</Text>)}
      <Portal>
        {modalOn && (
        <PostCodeModal
          onClose={handleModal}
        />
        )}
      </Portal>
    </>
  );
}

const TopTextBox = styled.div`
  display: flex;
  margin-bottom: 5px;
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

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > p {
    color: #574030;
    margin-right: 35px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  svg {
    font-size: 1.3rem;
    color: #BEAC9F;
  }
`;

export default BasicInfo;
