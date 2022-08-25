import { postBankbookType, deleteBankbookType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import bankbookApi from '../../../../../lib/shop/api/bankBookApi';

export default function useBankbook() {
  const { setValue } = useFormContext();

  const postBankbook = async (formData:any):Promise<postBankbookType> => {
    const data = await bankbookApi.createEx(formData);

    return data;
  };

  const deleteBankbook = async ():Promise<deleteBankbookType> => {
    const data = await bankbookApi.deleteEx();

    return data;
  };

  const uploadBankbookMutation = useMutation(
    postBankbook,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setValue('contents.bankbookUrl', data.content);
      },
    },
  );

  const removeBankbookMutation = useMutation(
    deleteBankbook,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        setValue('contents.bankbookUrl', null);
      },
    },
  );

  return {
    uploadBankbookMutation,
    removeBankbookMutation,
  };
}
