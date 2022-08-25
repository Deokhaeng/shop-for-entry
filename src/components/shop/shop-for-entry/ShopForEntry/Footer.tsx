import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ShopHourListOn } from '@/atoms/shop/DetailInfoState';
import { EntryComplete, PageNumState } from '@/atoms/shop/ShopForEntryState';
import { FooterPropsType } from '@lib/shop/interface';
import useUpdateShopEntry from './hooks/useUpdateShopEntry';
import { AccountNumError, BusinessNumMsg } from '@/atoms/shop/CalculateState';
import useShopEntryForm from './hooks/useShopEntryForm';

function Footer({ firstOn, secondOn }: FooterPropsType) {
  const [nextText, setNextText] = useState('');
  const [btnColor, setBtnColor] = useState('');
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { contents } = errors as any;
  const shopHourListOn = useRecoilValue(ShopHourListOn);
  const [pageNum, setPageNum] = useRecoilState(PageNumState);
  const setEntryComplete = useSetRecoilState(EntryComplete);
  const form = watch('contents');
  const businessNumMsg = useRecoilValue(BusinessNumMsg);
  const { updateShopEntryMutation } = useUpdateShopEntry();
  const shopHourListEndTime = watch('contents.shopHourList').filter((x) => x.endTime?.length === 5);
  const shopHourListStartTime = watch('contents.shopHourList').filter((x) => x.startTime?.length === 5);
  const { onSubmit } = useShopEntryForm();
  const [earlyLateCharge, setEarlyLateCharge] = useState(true);
  const accountNumError = useRecoilValue(AccountNumError);

  const basicInfoBtnOn:boolean = (
    pageNum === 1
    && watch('contents.name')
    && watch('contents.addrCd')
    && watch('contents.addrDetail')
    && watch('contents.sido')
    && watch('contents.sigungu')
    && watch('contents.sigunguCd')
    && watch('contents.addrRoad')
    && watch('contents.addrDetail')
    && (watch('contents.makeUp') === true || watch('contents.personalColor') === true)
  );

  const detailInfoBtnOn:boolean = (
    pageNum === 2
    && shopHourListOn
    && shopHourListStartTime.length !== 0
    && shopHourListEndTime.length !== 0
    && earlyLateCharge
    && watch('contents.description')
    && watch('contents.shopHourList')
  );

  const calculateBtnOn:boolean = (
    pageNum === 3
    && !contents?.business
    && !contents?.businessName
    && !contents?.businessNum
    && watch('contents.bankCd')
    && !contents?.accountNum
    && !businessNumMsg
    && watch('contents.businessNum')?.length > 11
    && watch('contents.accountNum')
    && watch('contents.businessName')
    && !accountNumError
  );

  const imageUploadBtnOn:boolean = (
    pageNum === 4
  );

  const agreementsBtnOn:boolean = (
    pageNum === 5
    && firstOn === true
    && secondOn === true
  );

  const handleNextText = () => {
    if (pageNum === 5) {
      setNextText('입점 신청 제출하기');
    } else {
      setNextText('다음으로');
    }
  };

  const handleBtnColor = () => {
    if (agreementsBtnOn) {
      setBtnColor('#746052');
    } else {
      setBtnColor('#E3E3E3');
      if (pageNum !== 6) { setEntryComplete(false); }
    }
    if (basicInfoBtnOn) {
      setBtnColor('#746052');
    }
    if (detailInfoBtnOn) {
      setBtnColor('#746052');
    }
    if (calculateBtnOn) {
      setBtnColor('#746052');
    }
    if (imageUploadBtnOn) {
      setBtnColor('#746052');
    }
  };

  useEffect(() => {
    handleNextText(); handleBtnColor();
  }, [pageNum, firstOn, secondOn, basicInfoBtnOn,
    detailInfoBtnOn, calculateBtnOn, imageUploadBtnOn, shopHourListStartTime, shopHourListEndTime]);

  useEffect(() => {
    // 얼리/레이트차지 조건
    if (watch('contents.earlyTime').length !== 0 || watch('contents.lateTime').length !== 0 || watch('contents.earlyPrice').length !== 0) {
      setEarlyLateCharge(false);
      if (watch('contents.earlyPrice')) {
        setEarlyLateCharge(true);
      }
    }
    if (!watch('contents.earlyTime') && !watch('contents.lateTime') && !watch('contents.earlyPrice')) {
      setEarlyLateCharge(true);
    }
  }, [watch('contents.earlyTime'), watch('contents.lateTime'), watch('contents.earlyPrice')]);

  return (
    <>
      <div style={{ height: '54px', marginTop: '54px' }} />
      <FooterBox
        pageNum={pageNum}
      >
        {!agreementsBtnOn
          ? (
            <NextButton
              bg={btnColor}
              type="button"
              pageNum={pageNum}
              onClick={() => {
                if (basicInfoBtnOn) {
                  updateShopEntryMutation.mutate(form);
                }
                if (detailInfoBtnOn) {
                  updateShopEntryMutation.mutate(form);
                }
                if (calculateBtnOn) {
                  updateShopEntryMutation.mutate(form);
                }
                if (imageUploadBtnOn) {
                  updateShopEntryMutation.mutate(form);
                }
                if (agreementsBtnOn) {
                  setEntryComplete(agreementsBtnOn);
                  setPageNum(pageNum + 1);
                }
              }}
            >
              {nextText}
            </NextButton>
          )
          : (
            <SubmitInput
              type="submit"
              value={nextText}
              bg={btnColor}
              onClick={() => {
                setPageNum(pageNum + 1);
                onSubmit();
              }}
            />
          )}
      </FooterBox>
    </>
  );
}

const FooterBox = styled.div<{pageNum: number}>`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  margin-top: auto;
  padding: 0 16px;
  ${({ pageNum }) => (pageNum === 6 || pageNum === 0 ? css`display: none;` : 'display: flex;')}
  ${({ pageNum }) => (pageNum === 5 && css`padding: 0 0 0 0;`)}
`;

const NextButton = styled.button<{ bg: string, pageNum: number}>`
  cursor: pointer;
  width: 100%;
  height: 54px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background: #E3E3E3;
  border: none;
  border-radius: 10px;
  margin: 25px 0;
  ${({ bg }) => css`background: ${bg}`}
  ${({ pageNum }) => (pageNum === 5 && css`
  border-radius: 0px; 
  height: 100px; 
  margin: 0; 
  padding-bottom: 45px;
  `)}
`;

const SubmitInput = styled.input<{ bg: string}>`
  cursor: pointer;
  width: 100%;
  height: 54px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background: #E3E3E3;
  border: none;
  border-radius: 0px; 
  height: 100px; 
  margin: 0; 
  padding-bottom: 45px;
  text-align: center;
  ${({ bg }) => css`background: ${bg}`}
`;

export default Footer;
