/* eslint-disable consistent-return */
import axios from 'axios';

const adminApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ADMIN_API_SERVER}`,
  timeout: 10000,
});

adminApiClient.defaults.paramsSerializer = (paramObj: { [key: string]: string }) => {
  const params = new URLSearchParams();

  Object.entries(paramObj).forEach(([key, value]) => {
    if (String(value) === 'false' || value === null || value === 'null') {
      return;
    }
    if (Number(value) === 0) {
      params.append(key, value);
      return;
    }
    if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
};

export default adminApiClient;
