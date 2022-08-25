export interface FacilityModalType {
  onClose?(): void
}

export interface MapPropsType {
  address?: string;
}

export interface UploadImgsPropsType {
  entrepreneurOn: boolean
}

export interface DayOptionListPropsType {
  handleOnChangeSelectValue(e: any): void
}

export interface FacilityBtnPropsType {
  props: any
  index: number
}

export interface FacilityListPropsType {
  shopFacilityList: any
  removeFacility: any
}

export interface ContentPropsType {
  children?: (string | JSX.Element)[] | string | JSX.Element
  phoneNumCheck?: boolean
  height?: number
  pageNum?: number
}

export interface TimerPropsType {
  validationRes: string
}

export interface ConsentListPropsType {
  handleFirstConsent(): void
  handleSecondConsent(): void
  handleThirdConsent(): void
  handleFourthConsent(): void
  handleContinue(): void
  allOn(): void
  firstOn(): void
  secondOn(): void
  thirdOn(): void
  fourthOn(): void
  allState: boolean
  firstState: boolean
  secondState: boolean
  thirdState: boolean
  fourthState: boolean
}

export interface ContinuePropsType {
  handleContinue?(): void
}

export interface FirstConsentType {
  handleFirstConsent(): void
  firstState: boolean
  firstOn(): void
}

export interface FourthConsentType {
  handleFourthConsent(): void
  fourthOn(): void
  fourthState: boolean
}

export interface SecondConsentType {
  handleSecondConsent(): void
  secondState: boolean
  secondOn(): void
}

export interface ThirdConsentType {
  handleThirdConsent(): void
  thirdState: boolean
  thirdOn(): void
}

export interface FooterPropsType {
  firstOn?: boolean
  secondOn?: boolean
  data: any
}

export interface updateFormPropsType {
  accountNum: string
  addrCd: number
  addrDetail: string
  addrLot: string
  addrRoad: string
  bankCd: string
  bankbookUrl: string
  business: boolean
  businessName: string
  businessNum: string
  businessRegUrl: string
  coverImages: [
    {
      coverImageId: number
      imageUrl: string
    }
  ]
  description: string
  earlyPrice: any
  earlyTime: string
  homepage: string
  imgUrl: string
  lateTime: string
  name: string
  makeUp: boolean
  personalColor: boolean
  portfolios: [
    {
      imagePath: string
      portfolioId: number
    }
  ]
  shopFacilityList: [
    {
      facilityCd: number
      name: string
    }
  ]
  shopHourList: [{
    dateType: string
    dayOff: boolean
    endTime: string
    startTime: string
  }]
  sido: string
  sigungu: string
  sigunguCd: number
  way: string
  phoneMain:string
}

export interface HeaderPropsType {
  pageNum?: number
  handlePrevPageNum?(): void
}

export interface PageWrapPropsType {
  children?: (string | JSX.Element)[] | string | JSX.Element
  height?: number
  phoneNumCheck?: boolean
  bg?: string
  onClick?(e: any): void
  pageNum?: number
}

export interface ButtonPropsType {
  bg?: string
  children?: (string | JSX.Element)[] | string | JSX.Element
  S?: boolean
  M?: boolean
  L?: boolean
  CircleCheckOff?: boolean
  CircleCheckOffS?: boolean
  RectangleCheckOff?: boolean
  Delete?: boolean
  DayCheckOff?: boolean
  AddImage?: boolean
  AddCircle?: boolean
  Day?: string
  buttonOn?: boolean
  Facility?: boolean
  addr?: boolean
  width?: string
  height?: string
  fontSize?: string
  onClick?(e: any): void | any
  type?: any
}

export interface InputPropsType {
  placeholder?: string
  XS?: boolean
  S?: boolean
  M?: boolean
  file?: boolean
  password?: boolean
  phone?: boolean
  authentication?: boolean
  ref?: any
  id?: string
  accept?: string
  width?: string
  height?: string
  margin?: string
  color?: string
  onChange?(e:any): void
  onKeyUp?(e:any): void
  value?: string
  register?: any
  setValue?: any
  inputOn?: boolean
  disabled?: boolean
  readonly?: boolean
  center?: boolean
  map?: boolean
  mode?: any
  maxLength?: any
}

export interface TextPropsType {
  children: any
  XS?: boolean
  S?: boolean
  M?: boolean
  bold?: boolean
  nextText?: boolean
  color?: string
  margin?: string
  validation?:boolean
  message?: string
}

export interface ShopEntryFormPropsType {
  contents: {
    accountNum: string
    addrCd: number
    addrDetail: string
    addrLot: string
    addrRoad: string
    bankCd: string
    bankbookUrl: string
    business: boolean
    businessName: string
    businessNum: string
    businessRegUrl: string
    coverImages: [
      {
        coverImageId: number
        imageUrl: string
      }
    ]
    description: string
    earlyPrice: any
    earlyTime: string
    homepage: string
    imgUrl: string
    lateTime: string
    name: string
    makeUp: boolean
    personalColor: boolean
    portfolios: [
      {
        imagePath: string
        portfolioId: number
      }
    ]
    shopFacilityList: [
      {
        facilityCd: number
        name: string
      }
    ]
    shopHourList: [{
      dateType: string
      dayOff: boolean
      endTime: string
      startTime: string
    }]
    sido: string
    sigungu: string
    sigunguCd: number
    way: string
    phoneMain:string
  }
}

export interface useFacilityListType {
  items: [
    {
      facilityCd: number;
      facilityName: string;
      imgUrl: string;
    }
  ]
}

export interface useBankListType {
  items: [
    {
      bankCd: string;
      bankName: string;
    }
  ]
}

export interface useAccountInfoType {
  content: string
}

export interface useCheckManagerContactType {
  response: string
}

export interface useCheckValidationNumberType {
  response: string
}

export interface useCheckDupType {
  response: boolean
}

export interface postBankbookType {
  content: string
}

export interface deleteBankbookType {
  response: string
}

export interface postBusinessRegType {
  content: string
}

export interface deleteBusinessRegType {
  response: string
}

export interface postThumbnailType {
  content: string
}

export interface deleteThumbnailType {
  response: string
}

export interface poestCoverImageType {
  items:[
    {
      coverImageId: number,
      imageUrl: string,
    }
  ]
}

export interface deleteCoverImageType {
  response: string
}

export interface postPortfoliosType {
  items:[
    {
      createDate: string,
      imagePath:string,
      mappingCd: string,
      mappingCdName: string,
      marketingConsent: boolean,
      operatorSeq: number,
      portfolioId: number,
      seq: number,
      thumbnailImagePath: string,
      visible: boolean
    }
  ]
}

export interface deletePortfoliosType {
  response: string
}

export interface SignUpFormProps {
  loginKey: string,
  password: string,
  checkPw: string,
  validationNumber: string,
  name: string,
  managerName: string,
  managerContact: string,
  managerEmail: string,
  status: number,
}
export interface UpdateSignUpFormProps {
  loginKey: string,
  password: string,
  checkPw: string,
  validationNumber: string,
  name: string,
  managerName: string,
  managerContact: string,
  managerEmail: string,
  status: number,
}
export interface putBasicInfoType {
  response: string
}

export interface useAccoutInfoPropsType{
  data: any
  error: any
  refetch: any
}

export interface MessageModalPropsType {
  onClose?(): void
  modalMessage: string
}

export interface PostCodeModalPropsType {
  onClose?(): void
}

export interface LoginFormProps {
  id: string
  password: string
}
