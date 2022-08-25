import apiClient from '@lib/shop/api//apiClientShop';

const createEx = async (validation: object) => {
  const { data } = await apiClient.post('/api', validation);

  return data;
};

const validationApi = {
  createEx,
};
export default validationApi;
