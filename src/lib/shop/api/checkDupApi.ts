import apiClient from '@lib/shop/api//apiClientShop';

const getEx = async (loginKey: string) => {
  const { data } = await apiClient.get(`/api=${loginKey}`);

  return data;
};

const checkDupApi = {
  getEx,
};

export default checkDupApi;
