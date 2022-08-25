import { useFormContext } from 'react-hook-form';
import portfoliosApi from '@lib/shop/api/portfoliosApi';
import { postPortfoliosType, deletePortfoliosType } from '@lib/shop/interface';
import { useMutation } from '@tanstack/react-query';

export default function usePortfolios() {
  const { setValue, watch } = useFormContext();

  const postPortfolios = async (formData:any):Promise<postPortfoliosType> => {
    const data = await portfoliosApi.createEx(formData);

    return data;
  };

  const deletePortfolios = async (portfolioId:number):Promise<deletePortfoliosType> => {
    const data = await portfoliosApi.deleteEx(portfolioId);

    return data;
  };

  const uploadPortfoliosMutation = useMutation(
    postPortfolios,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        const portfolios = watch('contents.portfolios');
        portfolios.push(...data.items);
        setValue('contents.portfolios', portfolios);
      },
    },
  );

  const removePortfoliosMutation = useMutation(
    deletePortfolios,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data, variabla) => {
        console.log(data);
        const newPortfolios = watch('contents.portfolios').filter((x) => x.portfolioId !== variabla);
        setValue('contents.portfolios', newPortfolios);
      },
    },
  );

  return {
    uploadPortfoliosMutation,
    removePortfoliosMutation,
  };
}
