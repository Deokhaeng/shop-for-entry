import { AreementFirstOn, AreementsSecondOn } from '@/atoms/shop/AgreementsState';
import { AccountNumError, BusinessNumMsg, CurrentValue } from '@/atoms/shop/CalculateState';
import { ShopHourListOn } from '@/atoms/shop/DetailInfoState';
import { CoverImagesState, PortfoliosState, ThumbnailState } from '@/atoms/shop/ImgUploadState';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import {
  CheckDuplicate, CheckNum, IdMessage, PhoneNumCheck, PhoneNumMsg, ShopName, Time, ValidationRes,
} from '@/atoms/shop/SignUpState';
import { useResetRecoilState } from 'recoil';

export default function useResetState() {
  const resetIdMessage = useResetRecoilState(IdMessage);
  const resetPhoneNumCheck = useResetRecoilState(PhoneNumCheck);
  const resetPhoneNumMsg = useResetRecoilState(PhoneNumMsg);
  const resetCheckNum = useResetRecoilState(CheckNum);
  const resetPageNum = useResetRecoilState(PageNumState);
  const resetShopName = useResetRecoilState(ShopName);
  const resetValidationRes = useResetRecoilState(ValidationRes);
  const resetShopHourListOn = useResetRecoilState(ShopHourListOn);
  const resetCheckDuplicate = useResetRecoilState(CheckDuplicate);
  const resetTime = useResetRecoilState(Time);
  const resetCurrentValue = useResetRecoilState(CurrentValue);
  const resetCoverImagesState = useResetRecoilState(CoverImagesState);
  const resetPortfoliosState = useResetRecoilState(PortfoliosState);
  const resetThumbnailState = useResetRecoilState(ThumbnailState);
  const resetAreementFirstOn = useResetRecoilState(AreementFirstOn);
  const resetAreementsSecondOn = useResetRecoilState(AreementsSecondOn);
  const resetBusinessNumMsg = useResetRecoilState(BusinessNumMsg);
  const resetAccountError = useResetRecoilState(AccountNumError);

  const resetSignUpState = () => {
    resetIdMessage();
    resetPhoneNumCheck();
    resetPhoneNumMsg();
    resetCheckNum();
    resetShopName();
    resetValidationRes();
    resetCheckDuplicate();
    resetTime();
  };

  const resetShopEntryState = () => {
    resetPageNum();
    resetShopHourListOn();
    resetCurrentValue();
    resetCoverImagesState();
    resetPortfoliosState();
    resetThumbnailState();
    resetAreementFirstOn();
    resetAreementsSecondOn();
    resetBusinessNumMsg();
    resetAccountError();
  };

  return { resetSignUpState, resetShopEntryState };
}
