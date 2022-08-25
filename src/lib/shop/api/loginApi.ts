import apiClient from '@lib/shop/api//apiClientShop';
import { LoginFormProps } from '../interface';

const createEx = async (form: LoginFormProps) => {
  const { data } = await apiClient.post('/api', form);

  return data;
};

const loginApi = {
  createEx,
};

export default loginApi;
