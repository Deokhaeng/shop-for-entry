import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  FirstConsent, SecondConsent, ThirdConsent, FourthConsent, ConsentList, Continue,
} from './index';
import {
  FirstConsentOn, SecondConsentOn, ThirdConsentOn, FourthConsentOn, ContinueOn, AllOn, FirstOn,
  SecondOn, ThirdOn, FourthOn,
} from '../../../atoms/shop/TermsState';
import { removeToken } from '@lib/shop/token';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import useResetState from './hooks/useResetState';

function Terms() {
  const [firstConsentOn, setFirstConsentOn] = useRecoilState(FirstConsentOn);
  const [secondConsentOn, setSecondConsentOn] = useRecoilState(SecondConsentOn);
  const [thirdConsentOn, setThirdConsentOn] = useRecoilState(ThirdConsentOn);
  const [fourthConsentOn, setFourthConsentOn] = useRecoilState(FourthConsentOn);
  const [continueOn, setContinueOn] = useRecoilState(ContinueOn);
  const [allOn, setAllOn] = useRecoilState(AllOn);
  const [firstOn, setFirstOn] = useRecoilState(FirstOn);
  const [secondOn, setSecondOn] = useRecoilState(SecondOn);
  const [thirdOn, setThirdOn] = useRecoilState(ThirdOn);
  const [fourthOn, setFourthOn] = useRecoilState(FourthOn);
  const pageNum = useRecoilValue(PageNumState);
  const { resetSignUpState, resetShopEntryState } = useResetState();

  const handleFirstConsent = () => {
    setFirstConsentOn(!firstConsentOn);
  };
  const handleSecondConsent = () => {
    setSecondConsentOn(!secondConsentOn);
  };
  const handleThirdConsent = () => {
    setThirdConsentOn(!thirdConsentOn);
  };
  const handleFourthConsent = () => {
    setFourthConsentOn(!fourthConsentOn);
  };
  const handleContinue = () => {
    setContinueOn(!continueOn);
  };
  const handleAllOn = () => {
    if (allOn === false) {
      setFirstOn(true);
      setSecondOn(true);
      setThirdOn(true);
      setFourthOn(true);
      setAllOn(!allOn);
    } else {
      setFirstOn(false);
      setSecondOn(false);
      setThirdOn(false);
      setFourthOn(false);
      setAllOn(!allOn);
    }
  };
  const handleFirstOn = () => {
    setFirstOn(!firstOn);
  };
  const handleSecondOn = () => {
    setSecondOn(!secondOn);
  };
  const handleThirdOn = () => {
    setThirdOn(!thirdOn);
  };
  const handleFourthOn = () => {
    setFourthOn(!fourthOn);
  };

  useEffect(() => {
    const OnBtns = firstOn === true && secondOn === true && thirdOn === true && fourthOn === true;
    if (OnBtns) { setAllOn(true); } else { setAllOn(false); }
  }, [firstOn, secondOn, thirdOn, fourthOn]);

  useEffect(() => {
    removeToken();
  }, []);

  useEffect(() => {
    resetSignUpState();
    resetShopEntryState();
  }, [pageNum]);

  if (firstConsentOn === true) {
    return (
      <FirstConsent
        handleFirstConsent={handleFirstConsent}
        firstOn={handleFirstOn}
        firstState={firstOn}
      />
    );
  }
  if (secondConsentOn === true) {
    return (
      <SecondConsent
        handleSecondConsent={handleSecondConsent}
        secondOn={handleSecondOn}
        secondState={secondOn}
      />
    );
  }
  if (thirdConsentOn === true) {
    return (
      <ThirdConsent
        handleThirdConsent={handleThirdConsent}
        thirdOn={handleThirdOn}
        thirdState={thirdOn}
      />
    );
  }
  if (fourthConsentOn === true) {
    return (
      <FourthConsent
        handleFourthConsent={handleFourthConsent}
        fourthOn={handleFourthOn}
        fourthState={fourthOn}
      />
    );
  }
  if (continueOn === true) {
    return (
      <Continue handleContinue={handleContinue} />
    );
  }

  return (
    <TermsWrap>
      <LogoImgBox />
      <TextTop>
        만나서 반가워요 😊
        <br />
        샵 입점 신청을 진행하기 전
        <br />
        가입 약관을 확인해 주세요
      </TextTop>
      <ConsentList
        handleFirstConsent={handleFirstConsent}
        handleSecondConsent={handleSecondConsent}
        handleThirdConsent={handleThirdConsent}
        handleFourthConsent={handleFourthConsent}
        handleContinue={handleContinue}
        allOn={handleAllOn}
        firstOn={handleFirstOn}
        secondOn={handleSecondOn}
        thirdOn={handleThirdOn}
        fourthOn={handleFourthOn}
        allState={allOn}
        firstState={firstOn}
        secondState={secondOn}
        thirdState={thirdOn}
        fourthState={fourthOn}
      />
    </TermsWrap>
  );
}

const TermsWrap = styled.div`
  width: 100%;
  min-height: 50rem;
  height: 100vh;
  margin: 0 auto;
  background: #746052;
  color: #fff;
  position: relative;
`;

const LogoImgBox = styled.div`
  width: 23vh;
  height: 14rem;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 71px 0 45.57px 0;
`;

const TextTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  line-height: 31px;
`;

export default Terms;
