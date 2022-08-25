import apiClient from '@lib//shop/api/apiClient';

const createEx = async (form?: any) => {
  const { data } = await apiClient.post('/api', form);

  return data;
};

const deleteEx = async () => {
  const { data } = await apiClient.delete('/api');

  return data;
};

const businessRegApi = {
  createEx,
  deleteEx,
};

export default businessRegApi;
