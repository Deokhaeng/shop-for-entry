import React, { forwardRef, useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../../elements/shop';
import { MdOutlineClear } from 'react-icons/md';
import { useFieldArray, useFormContext } from 'react-hook-form';
import usePortfolios from './hooks/usePortfolios';
import imageCompression from 'browser-image-compression';
import { useSetRecoilState } from 'recoil';
import { SpinnerOn } from '@/atoms/shop/ShopForEntryState';

const PortfoliosInput = forwardRef((props:any, ref:any) => (
  <input
    {...props}
    ref={ref}
  />
));

PortfoliosInput.displayName = 'PortfoliosInput';

function Portfolios() {
  const portfoliosInput = useRef(null);
  const { watch, control } = useFormContext();
  const setSpinnerOn = useSetRecoilState(SpinnerOn);
  const {
    fields,
  } = useFieldArray({
    control,
    name: 'contents.portfolios',
  });
  const portfolios = watch('contents.portfolios');
  const { uploadPortfoliosMutation, removePortfoliosMutation } = usePortfolios();

  const uploadCoverImg = () => {
    const images = portfoliosInput.current.files;
    if (images) {
      for (let i:number = 0; i < images.length; i += 1) {
        actionImgCompress(images[i]);
      }
    }
  };

  const actionImgCompress = async (fileSrc) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      setSpinnerOn(true);
      const compressedFile = await imageCompression(fileSrc, options);
      const files = new File([compressedFile], compressedFile.name);
      const formData = new FormData();
      formData.append('images', files);
      uploadPortfoliosMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinnerOn(false);
    }
  };

  return (
    <BtnListBox>
      <UploadBtn
        className="input-portfoliosInput-button"
        htmlFor="input-portfoliosInput"
      >
        <p>+</p>
        추가하기
      </UploadBtn>
      <PortfoliosInput
        ref={portfoliosInput}
        type="file"
        id="input-portfoliosInput"
        accept=".png, .jpg, .jpeg, .gif"
        style={{ display: 'none' }}
        multiple
        onChange={() => uploadCoverImg()}
      />
      {portfolios && portfolios.map((x) => (
        <ImageBox
          key={x.portfolioId}
          src={x.imagePath}
        >
          <Button
            Delete
            onClick={() => {
              removePortfoliosMutation.mutate(x.portfolioId);
            }}
          >
            <MdOutlineClear />
          </Button>
        </ImageBox>
      ))}
    </BtnListBox>
  );
}

const BtnListBox = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImageBox = styled.div<{src : string}>`
  background-size: cover;
  position: relative;
  border-radius: 0.3rem;
  width: 76px;
  height: 76px;
  ${({ src }) => src && `background-image: url(${src});`};
`;

const UploadBtn = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 76px;
  height: 76px;
  border-radius: 4px;
  border: none;
  color: #9A8576;
  background: #FBFBFB;
  text-align: center;
  & > p {
   margin-bottom: 0.3rem;
  }
`;

export default Portfolios;
