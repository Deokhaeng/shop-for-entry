import React, {
  forwardRef, useRef, useState,
} from 'react';
import styled from '@emotion/styled';
import { Text } from '../../../../elements/shop';
import { useFormContext } from 'react-hook-form';
import { UploadImgsPropsType } from '@lib/shop/interface';
import useBankbook from '@components/shop/shop-for-entry/Calculate/hooks/useBankbook';
import useBusinessReg from '@components/shop/shop-for-entry/Calculate/hooks/useBusinessReg';

const BusinessRegInput = forwardRef((props:any, ref:any) => (
  <input
    {...props}
    ref={ref}
  />
));

BusinessRegInput.displayName = 'BusinessRegInput';

const BankbookInput = forwardRef((props:any, ref:any) => (
  <input
    {...props}
    ref={ref}
  />
));

BankbookInput.displayName = 'BankbookInput';

function CopiedImages({ entrepreneurOn }: UploadImgsPropsType) {
  const businessRegInput = useRef(null);
  const bankbookInput = useRef(null);
  const { uploadBankbookMutation, removeBankbookMutation } = useBankbook();
  const { uploadBusinessRegMutation, removeBusinessRegMutation } = useBusinessReg();
  const [businessRegName, setBusinessRegName] = useState('');
  const [bankbookName, setBankbookName] = useState('');
  const { watch } = useFormContext();

  const uploadBusinessReg = () => {
    const file = businessRegInput.current.files[0];
    setBusinessRegName(file.name);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    uploadBusinessRegMutation.mutate(formData);
  };

  const uploadBankbook = () => {
    const file = bankbookInput.current.files[0];
    setBankbookName(file.name);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    uploadBankbookMutation.mutate(formData);
  };

  return (
    <UploadBtnWrap>
      <UploadBtnBox>
        <TextBox>
          <Text bold>{entrepreneurOn ? '사업자등록증 사본' : '신분증 사본'}</Text>
        </TextBox>
        { !businessRegName && !watch('contents.businessRegUrl') ? (
          <>
            <UploadBtn
              className="input-businessReg-button"
              htmlFor="input-businessRegInput"
            >
              업로드
            </UploadBtn>
            <BusinessRegInput
              ref={businessRegInput}
              type="file"
              id="input-businessRegInput"
              accept=".png, .jpg, .jpeg, .gif"
              style={{ display: 'none' }}
              onChange={() => uploadBusinessReg()}
            />
          </>
        ) : (
          <DeleteBtn
            onClick={() => { removeBusinessRegMutation.mutate(); setBusinessRegName(''); }}
          >
            취소
          </DeleteBtn>
        )}
        {businessRegName && <FileName>{businessRegName}</FileName>}
      </UploadBtnBox>

      <UploadBtnBox>
        <TextBox>
          <Text bold>통장 사본</Text>
        </TextBox>
        { !bankbookName && !watch('contents.bankbookUrl') ? (
          <>
            <UploadBtn
              className="input-bankbookInput-button"
              htmlFor="input-bankbookInput"
            >
              업로드
            </UploadBtn>
            <BankbookInput
              ref={bankbookInput}
              type="file"
              id="input-bankbookInput"
              accept=".png, .jpg, .jpeg, .gif"
              style={{ display: 'none' }}
              onChange={() => uploadBankbook()}
            />
          </>
        ) : (
          <DeleteBtn
            onClick={() => { removeBankbookMutation.mutate(); setBankbookName(''); }}
          >
            취소
          </DeleteBtn>
        )}
        {bankbookName && <FileName>{bankbookName}</FileName>}
      </UploadBtnBox>
    </UploadBtnWrap>
  );
}

const UploadBtnWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const UploadBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  overflow: hidden;
`;

const TextBox = styled.div`
  display: flex;
  margin: 13px 0 5px 0;
`;

const UploadBtn = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  height: 50px;
  background: #FBFBFB;
  color: #9A8576;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  &:hover {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  height: 50px;
  background: #FBFBFB;
  color: #9A8576;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  &:hover {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
`;

const FileName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default CopiedImages;
