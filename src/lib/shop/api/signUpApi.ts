import apiClient from '@lib/shop/api//apiClientShop';
import { UpdateSignUpFormProps } from '../interface';

const createEx = async (form: UpdateSignUpFormProps) => {
  const { data } = await apiClient.post('/api', form);

  return data;
};

const signUpApi = {
  createEx,
};

export default signUpApi;
