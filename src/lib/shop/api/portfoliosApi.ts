import apiClient from '@lib//shop/api/apiClient';

const createEx = async (formData?: any) => {
  const { data } = await apiClient.post('/api/', formData);

  return data;
};

const deleteEx = async (portfolioId?: any) => {
  const { data } = await apiClient.delete(`/api/${portfolioId}`);

  return data;
};

const portfoliosApi = {
  createEx,
  deleteEx,
};

export default portfoliosApi;
