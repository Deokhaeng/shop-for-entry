import apiClient from '@lib/shop/api//apiClientShop';

const getEx = async (managerContact: string) => {
  const { data } = await apiClient.get(`/api=${managerContact}`);

  return data;
};

const validationNumApi = {
  getEx,
};

export default validationNumApi;
