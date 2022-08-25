/* eslint-disable consistent-return */
import { PageNumState } from '@/atoms/shop/ShopForEntryState';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import nookies from 'nookies';
import { useRecoilValue } from 'recoil';

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

adminApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { accessTokenShop } = nookies.get({} as any);

    if (config.url === '/api/v1.0/login') {
      return config;
    }

    if (!accessTokenShop) {
      const pageNum = useRecoilValue(PageNumState);
      if (pageNum === 0) {
        window.location.assign('/shop/signup');
      }
      if (pageNum > 0) {
        window.location.assign('/shop/terms');
      }
      window.location.assign('/shop/terms');

      return config;
    }

    return {
      ...config,
      headers: {
        Authorization: `${accessTokenShop}`,
      },
    };
  },
  (error) => Promise.reject(error),
);

adminApiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response?.status === 401) {
      window.location.assign('/shop/terms');
      return;
    }

    if (response?.status === 500) {
      // alert('서버에 오류가 있습니다. 잠시후 시도해 주세요.');
      return;
    }

    return Promise.reject(response);
  },
);

export default adminApiClient;
