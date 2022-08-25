import apiClient from '@lib//shop/api/apiClient';

const createEx = async (form?: any) => {
  const { data } = await apiClient.post('/api', form);

  return data;
};

const deleteEx = async (form?: any) => {
  const { data } = await apiClient.delete('/api', form);

  return data;
};

const thumbnailApi = {
  createEx,
  deleteEx,
};

export default thumbnailApi;
