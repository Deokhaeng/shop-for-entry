import React, { forwardRef, useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../../elements/shop';
import { MdOutlineClear } from 'react-icons/md';
import { useFieldArray, useFormContext } from 'react-hook-form';
import useCoverImages from './hooks/useCoverImages';
import { useSetRecoilState } from 'recoil';
import { ModalMessage, ShopEntryModalOn } from '@/atoms/shop/ModalState';
import imageCompression from 'browser-image-compression';
import { SpinnerOn } from '@/atoms/shop/ShopForEntryState';

const CoverImgInput = forwardRef((props:any, ref:any) => (
  <input
    {...props}
    ref={ref}
  />
));

CoverImgInput.displayName = 'CoverImgInput';

function CoverImages() {
  const coverImgInput = useRef(null);
  const { watch, control } = useFormContext();
  const setModalOn = useSetRecoilState(ShopEntryModalOn);
  const setModalMessage = useSetRecoilState(ModalMessage);
  const setSpinnerOn = useSetRecoilState(SpinnerOn);
  const {
    fields,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'contents.coverImages',
  });
  const coverImages = watch('contents.coverImages');
  const { uploadCoverImagesMutation, removeCoverImagesMutation } = useCoverImages();

  const uploadCoverImg = () => {
    const images = coverImgInput.current.files;
    if (images.length > 5) {
      setModalOn(true);
      setModalMessage('커버 이미지는 최대 5장까지\n등록할 수 있어요!');
      return;
    }
    if (coverImages.length + images.length > 5) {
      setModalOn(true);
      setModalMessage('커버 이미지는 최대 5장까지\n등록할 수 있어요!');
      return;
    }
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
      uploadCoverImagesMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinnerOn(false);
    }
  };

  return (
    <BtnListBox>
      { coverImages.length < 5 && (
        <UploadBtn
          className="input-coverImgInput-button"
          htmlFor="input-coverImgInput"
        >
          <p>+</p>
          추가하기
        </UploadBtn>
      )}
      <CoverImgInput
        ref={coverImgInput}
        type="file"
        id="input-coverImgInput"
        accept=".png, .jpg, .jpeg, .gif"
        style={{ display: 'none' }}
        multiple
        onChange={() => uploadCoverImg()}
      />
      {coverImages && coverImages.map((x, i) => (
        <div key={x.coverImageId}>
          <ImageBox
            key={x.coverImageId}
            src={coverImages[i].imageUrl}
          >
            <Button
              Delete
              onClick={() => {
                removeCoverImagesMutation.mutate(x.coverImageId);
              }}
            >
              <MdOutlineClear />
            </Button>
          </ImageBox>
        </div>
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

export default CoverImages;
