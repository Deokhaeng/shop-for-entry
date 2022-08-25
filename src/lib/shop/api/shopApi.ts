import apiClient from '@lib//shop/api/apiClient';
import { updateFormPropsType } from '../interface';

const createEx = async () => {
  const { data } = await apiClient.post('/api');

  return data;
};

const editEx = async (form: updateFormPropsType) => {
  const { data } = await apiClient.put('/api', form);

  return data;
};

const getEx = async () => {
  const { data } = await apiClient.get('/api');

  return data;
};

const shopApi = {
  createEx,
  getEx,
  editEx,
};

export default shopApi;
