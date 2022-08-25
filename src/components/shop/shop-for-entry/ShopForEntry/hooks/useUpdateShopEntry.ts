import { putBasicInfoType, updateFormPropsType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import shopApi from '@lib/shop/api/shopApi';
import { ModalMessage, ShopEntryModalOn } from '@/atoms/shop/ModalState';

export default function useUpdateShopEntry() {
  const setModalOn = useSetRecoilState(ShopEntryModalOn);
  const setModalMessage = useSetRecoilState(ModalMessage);
  const [pageNum, setPageNum] = useRecoilState(PageNumState);

  const putBasicInfo = async (form:updateFormPropsType):Promise<putBasicInfoType> => {
    const updateForm: updateFormPropsType = { ...form };

    delete updateForm.bankbookUrl;
    delete updateForm.businessRegUrl;
    delete updateForm.imgUrl;
    delete updateForm.coverImages;
    delete updateForm.portfolios;
    const removedCommasEarlyPrice = updateForm.earlyPrice.replace(/,/g, '');
    updateForm.earlyPrice = removedCommasEarlyPrice;
    Number(updateForm.earlyPrice);
    const data = await shopApi.editEx(updateForm);

    return data;
  };

  const updateShopEntryMutation = useMutation(
    putBasicInfo,
    {
      onError: (error) => {
        console.log(error);
        setModalOn(true);
        setModalMessage('입력한 값의 형식이 맞지 않습니다.');
      },
      onSuccess: () => {
        setPageNum(pageNum + 1);
        setModalMessage('');
      },
    },
  );

  return {
    updateShopEntryMutation,
  };
}
