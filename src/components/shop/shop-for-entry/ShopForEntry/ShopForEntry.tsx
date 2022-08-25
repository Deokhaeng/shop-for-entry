import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BasicInfo, DetailInfo, Calculate, ImgUpload, Agreements, Completion,
} from './index';
import { PageNumState, SpinnerOn } from '../../../../atoms/shop/ShopForEntryState';
import { PhoneNumCheck, ShopName } from '../../../../atoms/shop/SignUpState';
import { AreementFirstOn, AreementsSecondOn } from '../../../../atoms/shop/AgreementsState';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useShopEntryForm from './hooks/useShopEntryForm';
import { FormProvider } from 'react-hook-form';
import SignUp from '../SignUp/SignUp';
import {
  PageWrap, Header, Content, Footer,
} from './index';
import useSignUpForm from '../SignUp/hooks/useSignUpForm';
import { ShowOptions } from '@/atoms/shop/DetailInfoState';
import Portal from '@/portal/Portal';
import MessageModal from '@/portal/modals/MessageModal';
import { ModalMessage, ShopEntryModalOn } from '@/atoms/shop/ModalState';
import { removeToken } from '@lib/shop/token';
import nookies from 'nookies';
import useShopEntryData from './hooks/useShopEntryData';
import Spinner from '@/portal/modals/Spinner';

function ShopForEntry() {
  const [pageNum, setPageNum] = useRecoilState(PageNumState);
  const phoneNumCheck = useRecoilValue(PhoneNumCheck);
  const firstOn = useRecoilValue(AreementFirstOn);
  const secondOn = useRecoilValue(AreementsSecondOn);
  const setShowOptions = useSetRecoilState(ShowOptions);
  const [modalOn, setModalOn] = useRecoilState(ShopEntryModalOn);
  const spinnerOn = useRecoilValue(SpinnerOn);
  const modalMessage = useRecoilValue(ModalMessage);
  const { methods, handleSubmit } = useShopEntryForm();
  const shopName = useRecoilValue(ShopName);
  const { accessTokenShop } = nookies.get({} as any);
  const {
    setValue,
  } = methods;
  const {
    methods: methodsSignUp, handleSubmit: handleSubmitSignUp,
  } = useSignUpForm();
  const { data, refetch } = useShopEntryData(setValue);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const handlePrevPageNum = () => {
    if (pageNum === 0) {
      return;
    }
    if (pageNum === 1) {
      return;
    }
    setPageNum(pageNum - 1);
  };

  const onClose = (e) => {
    setShowOptions(() => false);
    e.stopPropagation();
  };

  useEffect(() => {
    const { accessTokenShop } = nookies.get({} as any);
    if (accessTokenShop) {
      setPageNum(1);
      refetch();
    } else {
      setPageNum(0);
      removeToken();
    }
    if (pageNum === 1) {
      refetch();
    }
  }, [accessTokenShop]);

  useEffect(() => {
    if (shopName) { setValue('contents.name', shopName); }
  }, [pageNum]);

  return (
    <PageWrap
      pageNum={pageNum}
      phoneNumCheck={phoneNumCheck}
    >
      <Header
        pageNum={pageNum}
        handlePrevPageNum={handlePrevPageNum}
      />
      <Content
        pageNum={pageNum}
        phoneNumCheck={phoneNumCheck}
      >
        <FormProvider {...methodsSignUp}>
          <form onSubmit={handleSubmitSignUp}>
            <SignUpWrap pageNum={pageNum}>
              <SignUp />
            </SignUpWrap>
          </form>
        </FormProvider>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <BasicInfoWrap pageNum={pageNum}>
              <BasicInfo />
            </BasicInfoWrap>
            <DetailInfoWrap
              pageNum={pageNum}
              onClick={onClose}
            >
              <DetailInfo />
            </DetailInfoWrap>
            <CalculateWrap
              pageNum={pageNum}
              onClick={onClose}
            >
              <Calculate />
            </CalculateWrap>
            <ImgUploadWrap pageNum={pageNum}>
              <ImgUpload />
            </ImgUploadWrap>
            <AgreementsWrap pageNum={pageNum}>
              <Agreements />
            </AgreementsWrap>
            <CompletionWrap pageNum={pageNum}>
              <Completion />
            </CompletionWrap>
            <Footer
              firstOn={firstOn}
              secondOn={secondOn}
              data={data}
            />
          </form>
        </FormProvider>
      </Content>
      <Portal>
        {modalOn && (
        <MessageModal
          onClose={handleModal}
          modalMessage={modalMessage}
        />
        )}
        {spinnerOn && (
        <Spinner />
        )}
      </Portal>
    </PageWrap>
  );
}

const SignUpWrap = styled.div <{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 0 ? css`display: inline;` : 'display: none;')}
`;

const BasicInfoWrap = styled.div <{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 1 ? css`display: inline;` : 'display: none;')}
`;

const DetailInfoWrap = styled.div<{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 2 ? css`display: inline;` : 'display: none;')}
`;

const CalculateWrap = styled.div<{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 3 ? css`display: inline;` : 'display: none;')}
`;

const ImgUploadWrap = styled.div<{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 4 ? css`display: inline;` : 'display: none;')}
`;

const AgreementsWrap = styled.div<{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 5 ? css`display: inline;` : 'display: none;')}
`;

const CompletionWrap = styled.div<{pageNum: number }>`
  ${({ pageNum }) => (pageNum === 6 ? css`display: inline;` : 'display: none;')}
`;

export default ShopForEntry;
