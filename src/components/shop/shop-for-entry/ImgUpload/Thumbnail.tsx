import React, { forwardRef, useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../../elements/shop';
import { MdOutlineClear } from 'react-icons/md';
import { useFormContext } from 'react-hook-form';
import useThumbnail from './hooks/useThumbnail';
import imageCompression from 'browser-image-compression';
import { useSetRecoilState } from 'recoil';
import { SpinnerOn } from '@/atoms/shop/ShopForEntryState';

const ThumbnailInput = forwardRef((props:any, ref:any) => (
  <input
    {...props}
    ref={ref}
  />
));

ThumbnailInput.displayName = 'ThumbnailInput';

function Thumbnail() {
  const thumbnailInput = useRef(null);
  const { watch } = useFormContext();
  const thumbnail = watch('contents.imgUrl');
  const { uploadThumbnailMutation, removeThumbnailMutation } = useThumbnail();
  const setSpinnerOn = useSetRecoilState(SpinnerOn);

  const uploadThumbnail = () => {
    const file = thumbnailInput.current.files[0];
    actionImgCompress(file);
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
      const file = new File([compressedFile], compressedFile.name);
      const formData = new FormData();
      if (compressedFile) {
        formData.append('file', file);
      }
      uploadThumbnailMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinnerOn(false);
    }
  };

  return (
    <BtnListBox>
      { !thumbnail && (
      <UploadBtn
        className="input-thumbnailInput-button"
        htmlFor="input-thumbnailInput"
      >
        <p>+</p>
        추가하기
      </UploadBtn>
      )}
      <ThumbnailInput
        ref={thumbnailInput}
        type="file"
        id="input-thumbnailInput"
        accept=".png, .jpg, .jpeg, .gif"
        style={{ display: 'none' }}
        onChange={uploadThumbnail}
      />
      {thumbnail && (
      <ImageBox src={thumbnail}>
        <Button
          Delete
          onClick={() => removeThumbnailMutation.mutate()}
        >
          <MdOutlineClear />
        </Button>
      </ImageBox>
      )}
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

export default Thumbnail;
