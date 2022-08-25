import apiClient from '@lib//shop/api/apiClient';

const getEx = async () => {
  const { data } = await apiClient.get('/api');
  console.log(data);

  return data;
};

const bankListApi = {
  getEx,
};

export default bankListApi;
