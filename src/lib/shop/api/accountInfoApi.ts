import apiClient from '@lib//shop/api/apiClient';

const getEx = async (form: string) => {
  const { data } = await apiClient.get(`/api?${form}`);

  return data;
};

const acconutInfoApi = {
  getEx,
};

export default acconutInfoApi;
