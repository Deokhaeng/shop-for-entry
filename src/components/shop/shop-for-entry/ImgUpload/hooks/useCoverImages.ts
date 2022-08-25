import coverImagesApi from '@lib/shop/api/coverImagesApi';
import { useFormContext } from 'react-hook-form';
import { poestCoverImageType, deleteCoverImageType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';

export default function useCoverImages() {
  const { setValue, watch } = useFormContext();

  const postCoverImages = async (formData:any):Promise<poestCoverImageType> => {
    const data = await coverImagesApi.createEx(formData);

    return data;
  };

  const deleteCoverImages = async (portfolioId:number):Promise<deleteCoverImageType> => {
    const data = await coverImagesApi.deleteEx(portfolioId);

    return data;
  };

  const uploadCoverImagesMutation = useMutation(
    postCoverImages,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        const coverImages = watch('contents.coverImages');
        coverImages.push(...data.items);
        setValue('contents.coverImages', coverImages);
      },
    },
  );

  const removeCoverImagesMutation = useMutation(
    deleteCoverImages,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data, variabla) => {
        console.log(data);
        const newCoverImages = watch('contents.coverImages').filter((x) => x.coverImageId !== variabla);
        setValue('contents.coverImages', newCoverImages);
      },
    },
  );

  return {
    uploadCoverImagesMutation,
    removeCoverImagesMutation,
  };
}
