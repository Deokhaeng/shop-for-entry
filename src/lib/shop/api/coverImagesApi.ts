import apiClient from '@lib//shop/api/apiClient';

const createEx = async (form?: any) => {
  const { data } = await apiClient.post('/api', form);

  return data;
};

const deleteEx = async (coverImageId?: any) => {
  const { data } = await apiClient.delete(`/api/${coverImageId}`);

  return data;
};

const coverImagesApi = {
  createEx,
  deleteEx,
};

export default coverImagesApi;
