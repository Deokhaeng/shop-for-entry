import React from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIos } from 'react-icons/md';
import { Text, Input } from '../../../elements/shop';
import MessageModal from '@/portal/modals/MessageModal';
import Portal from '@/portal/Portal';
import { FormProvider } from 'react-hook-form';
import useLoginForm from './hooks/useLoginForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ModalMessage, LoginModalOn } from '@/atoms/shop/ModalState';
import { ContinuePropsType } from '@lib/shop/interface';

function Continue({ handleContinue }: ContinuePropsType) {
  const [modalOn, setModalOn] = useRecoilState(LoginModalOn);
  const modalMessage = useRecoilValue(ModalMessage);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const { methods, handleSubmit } = useLoginForm();

  const {
    register, formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <ConsentWrap>
          <BackBtn onClick={handleContinue}>
            <MdArrowBackIos />
          </BackBtn>
          <Title>신청 이어하기</Title>
          <Content>
            <TopTextBox>
              <Text bold>아이디</Text>
            </TopTextBox>
            <Input
              M
              placeholder="아이디를 입력해주세요."
              register={{ ...register('id') }}
            />
            {errors.id && <ValidationText>{errors.id?.message}</ValidationText>}
            <TextBox>
              <Text bold>비밀번호</Text>
            </TextBox>
            <Input
              password
              placeholder="비밀번호를 입력해주세요."
              register={{ ...register('password') }}
            />
            {errors.password && <ValidationText>{errors.password?.message}</ValidationText>}
          </Content>
          <FooterBox
            type="submit"
            value="신청 이어하기"
          />
          <Portal>
            {modalOn && (
            <MessageModal
              onClose={handleModal}
              modalMessage={modalMessage}
            />
            )}
          </Portal>
        </ConsentWrap>
      </form>
    </FormProvider>
  );
}

const ConsentWrap = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;

  background: #FAF6F2 ;
  color: #9A8576;
`;

const BackBtn = styled.div`
  cursor: pointer;
  svg{
    font-size: 20px;
      color: #9A8576;
      position: absolute;
      left: 20px;
      top: 7.64%;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 7.64%;
  bottom: 89.16%;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 5px;
  position: absolute;
  width: 100%;
  height: 193px;
  padding: 0 16px;
  top: 135px;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 14px;
  font-weight: 500;
`;

const TopTextBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const ValidationText = styled.p`
  margin-top: 5px;
`;

const TextBox = styled.div`
  display: flex;
  margin-top: 10px;
`;

const FooterBox = styled.input`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  min-height: 94px;
  padding-top: 16px;
  padding-bottom: 59px;
  width: 100%;
  background: #746052;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export default Continue;
