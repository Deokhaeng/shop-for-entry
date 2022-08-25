import { postBusinessRegType, deleteBusinessRegType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import businessRegApi from '../../../../../lib/shop/api/businessRegApi';

export default function useBusinessReg() {
  const { setValue } = useFormContext();

  const postBankbook = async (formData:any):Promise<postBusinessRegType> => {
    const data = await businessRegApi.createEx(formData);

    return data;
  };

  const deleteBankbook = async ():Promise<deleteBusinessRegType> => {
    const data = await businessRegApi.deleteEx();

    return data;
  };

  const uploadBusinessRegMutation = useMutation(
    postBankbook,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setValue('contents.businessRegUrl', data.content);
      },
    },
  );

  const removeBusinessRegMutation = useMutation(
    deleteBankbook,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        setValue('contents.businessRegUrl', null);
      },
    },
  );

  return {
    uploadBusinessRegMutation,
    removeBusinessRegMutation,
  };
}
