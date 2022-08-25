import { ModalMessage, ShopEntryModalOn } from '@/atoms/shop/ModalState';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type onCopyFn = (text: string) => Promise<boolean>;

function useCopyClipBoard(): [boolean, onCopyFn] {
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const setModalOn = useSetRecoilState(ShopEntryModalOn);
  const setModalMessage = useSetRecoilState(ModalMessage);

  const onCopy: onCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);
      setModalOn(true);
      setModalMessage('샵 코드가 복사되었어요!');
      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  return [isCopy, onCopy];
}

export default useCopyClipBoard;
