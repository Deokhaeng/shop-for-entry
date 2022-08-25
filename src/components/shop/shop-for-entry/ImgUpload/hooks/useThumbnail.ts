import { useFormContext } from 'react-hook-form';
import thumbnailApi from '@lib/shop/api/thumbnailApi';
import { postThumbnailType, deleteThumbnailType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';

export default function useThumbnail() {
  const { setValue } = useFormContext();

  const postThumbnail = async (formData:any):Promise<postThumbnailType> => {
    const data = await thumbnailApi.createEx(formData);

    return data;
  };

  const deleteThumbnail = async ():Promise<deleteThumbnailType> => {
    const data = await thumbnailApi.deleteEx();

    return data;
  };

  const uploadThumbnailMutation = useMutation(
    postThumbnail,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setValue('contents.imgUrl', data.content);
      },
    },
  );

  const removeThumbnailMutation = useMutation(
    deleteThumbnail,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        setValue('contents.imgUrl', null);
      },
    },
  );

  return {
    uploadThumbnailMutation,
    removeThumbnailMutation,
  };
}
