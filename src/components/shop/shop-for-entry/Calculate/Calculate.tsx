import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaCheck } from 'react-icons/fa';
import { BsCaretDown } from 'react-icons/bs';
import { Input, Button, Text } from '../../../../elements/shop';
import BankOptionList from './BankOptionList';
import CopiedImages from './CopiedImages';
import { useRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import AccountNum from './AccountNum';
import { BusinessNumMsg, CurrentValue, ShowOptionsCalculate } from '@/atoms/shop/CalculateState';

function Calculate() {
  const [currentValue, setCurrentValue] = useRecoilState(CurrentValue);
  const [showOptions, setShowOptions] = useRecoilState(ShowOptionsCalculate);
  const [businessNumMsg, setBusinessNumMsg] = useRecoilState(BusinessNumMsg);
  const [businessNum, setBusinessNum] = useState('');
  const [businessNumMasking, setBusinessNumMasking] = useState(false);
  const {
    register, setValue, formState: { errors }, watch,
  } = useFormContext();
  const { contents } = errors as any;

  const handleEntrepreneurOn = () => {
    setValue('contents.business', true);
    setValue('contents.businessName', null);
    setValue('contents.businessNum', null);
    setValue('contents.bankCd', null);
    setValue('contents.accountNum', null);
    setValue('contents.businessRegUrl', null);
    setValue('contents.bankbookUrl', null);
    setCurrentValue('정산 은행을 선택해주세요.');
    setBusinessNumMsg('');
  };
  const handleIndividualOn = () => {
    setValue('contents.business', false);
    setValue('contents.businessName', null);
    setValue('contents.businessNum', null);
    setValue('contents.bankCd', null);
    setValue('contents.accountNum', null);
    setValue('contents.businessRegUrl', null);
    setValue('contents.bankbookUrl', null);
    setCurrentValue('정산 은행을 선택해주세요.');
    setBusinessNumMsg('');
  };

  const haneldBusinessNum = () => {
    const value = watch('contents.businessNum');
    if (!watch('contents.business')) {
      if (value?.length > 0) {
        setValue('contents.businessNum', value.replace(/[^0-9]/g, '').replace(/(\d{6})(\d{7})/, '$1-$2'));
      }
    } else if (value?.length > 0) {
      setValue('contents.businessNum', value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'));
    }
  };

  const CheckBusinessNum = () => {
    const value = watch('contents.businessNum');
    if (!watch('contents.business')) {
      const pattern = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-]*[1-4]\d{6}$/g;
      if (value?.length > 1 && !pattern.test(value)) {
        setBusinessNumMsg('주민등록번호가 올바르지 않습니다.');
      } else {
        setBusinessNumMsg('');
      }
    } else {
      const regsplitNum:number[] = value?.replace(/-/gi, '').split('').map((item) => parseInt(item, 10));

      if (regsplitNum?.length === 10) {
        const regkey = [1, 3, 7, 1, 3, 7, 1, 3, 5];
        let regNumSum = 0;
        for (let i = 0; i < regkey.length; i += 1) {
          regNumSum += regkey[i] * regsplitNum[i];
        }
        regNumSum += parseInt(`${(regkey[8] * regsplitNum[8]) / 10}`, 10);
        const regCheck = (Math.floor(regsplitNum[9])) === ((10 - (regNumSum % 10)) % 10);

        if (!regCheck) {
          setBusinessNumMsg('사업자등록번호가 올바르지 않습니다.');
        } else {
          setBusinessNumMsg('');
        }
      }
    }
  };

  useEffect(() => {
    haneldBusinessNum();
    if (!watch('contents.business')) {
      const businessNum = watch('contents.businessNum')?.replace(/-/g, '').replace(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
      setBusinessNum(businessNum);
    } else {
      setBusinessNum(watch('contents.businessNum'));
    }
    CheckBusinessNum();
  }, [watch('contents.businessNum'), businessNum]);

  return (
    <CalculateWrap
      onClick={(e) => {
        setBusinessNumMasking(false);
        setShowOptions(false);
        e.stopPropagation();
      }}
    >
      <TopTextBox>
        <span>*</span>
        <Text
          bold
        >
          사업자 형태
        </Text>
      </TopTextBox>
      <BtnBox>
        <Button
          CircleCheckOffS
          buttonOn={watch('contents.business')}
          onClick={handleEntrepreneurOn}
        >
          <FaCheck />
        </Button>
        <p>사업자</p>
        <Button
          CircleCheckOffS
          buttonOn={!watch('contents.business')}
          onClick={handleIndividualOn}
        >
          <FaCheck />
        </Button>
        <p>개인</p>
      </BtnBox>
      <TextBox>
        <span>*</span>
        <Text bold>
          {watch('contents.business') ? '사업자명' : '이름'}
        </Text>
      </TextBox>
      <Input
        M
        placeholder={watch('contents.business') ? '사업자명을 입력해주세요.' : '이름을 입력해주세요.'}
        register={{ ...register('contents.businessName') }}
      />
      {contents?.businessName && (<Text validation>{ contents.businessName?.message}</Text>)}
      <TextBox>
        <span>*</span>
        <Text bold>
          {watch('contents.business') ? '사업자 번호' : '주민등록 번호'}
        </Text>
      </TextBox>
      {businessNumMasking ? (
        <BusinessNumInput
          type="text"
          placeholder={watch('contents.business') ? '1 2 3 - 4 5 - 6 7 8 9 0 ' : '9 0 0 1 0 1 - 2 * * * * * *'}
          {...register('contents.businessNum')}
          maxLength={!watch('contents.business') ? 14 : 12}
          onClick={(e) => { e.stopPropagation(); }}
        />
      ) : (
        <BusinessNumMasikng
          onClick={(e) => { setBusinessNumMasking(true); e.stopPropagation(); }}
        >
          {watch('contents.businessNum') ? <p>{ businessNum }</p>
            : <p style={{ color: '#C7C7C7' }}>{watch('contents.business') ? '1 2 3 - 4 5 - 6 7 8 9 0 ' : '9 0 0 1 0 1 - 2 * * * * * *'}</p>}
        </BusinessNumMasikng>
      )}

      {contents?.businessNum && (<Text validation>{ contents.businessNum?.message}</Text>)}
      {!contents?.businessNum && businessNumMsg && <Text>{businessNumMsg}</Text>}
      <TextBox>
        <span>*</span>
        <Text bold>정산 은행</Text>
      </TextBox>
      <SelectBox
        onClick={(e) => {
          setShowOptions((prev) => !prev);
          e.stopPropagation();
        }}
        currentValue={currentValue}
      >
        <Label>{currentValue}</Label>
        <BsCaretDown />
        <SelectOptions
          show={showOptions}
          id="optionList"
        >
          <BankOptionList />
        </SelectOptions>
      </SelectBox>
      {!watch('contents.bankCd') && (<Text validation>정산 은행이 입력되지 않았습니다</Text>)}
      <TextBox>
        <span>*</span>
        <Text bold>계좌번호</Text>
      </TextBox>
      <AccountNum />
      {contents?.accountNum && (<Text validation>{ contents.accountNum?.message}</Text>)}
      <CopiedImages
        entrepreneurOn={watch('contents.business')}
      />
    </CalculateWrap>
  );
}

const CalculateWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopTextBox = styled.div`
  display: flex;
  color: #574030;
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
      margin-right: 70px;
      color: #574030
  }
`;

const BusinessNumInput = styled.input`
    &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #E3E3E3;;
  border-radius: 8px;
  margin-right: 9px;
  padding-left: 15px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const BusinessNumMasikng = styled.div`
    &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  font-family: "Apple SD Gothic Neo";
  cursor: text;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin-right: 9px;
  padding-left: 15px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
`;

// DropDown CSS
const SelectBox = styled.div<{ currentValue: string }>`
  position: relative;
  align-self: center;
  display: inline-flex;
  min-width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  padding-left: 10px;
  align-items: center;
  ${({ currentValue }) => (currentValue === '정산 은행을 선택해주세요.' ? 'color: #C7C7C7;' : 'color: #9A8576;')};
  cursor: pointer;
  svg {
    position: absolute;
    top: 16px;
    right: 20px;
    color: #C7C7C7;
    font-size: 15px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 55px;
  left: 0;
  width: 100%;
  height: 10rem;
  overflow-y: scroll;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  padding: 0;
  border-radius: 8px;
  border: ${(props) => (props.show ? '1px solid #F0F0F0' : 'none')};
  background: #FBFBFB;
  color: #9A8576;
  z-index: 1;
`;

export default Calculate;
