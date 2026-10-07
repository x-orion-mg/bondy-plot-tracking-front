import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {HttpError} from './HttpError.ts';

export const apiAxios = async <T>(config: AxiosRequestConfig) => {

  try {
    const response = await axios.request<T>({
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
      },
      baseURL: import.meta.env.VITE_BACKEND_API_URL
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError
    if (error.response?.status === 403) {
      window.location.href = '/not-authorized';
    }
    if (error.response?.status === 404) {
      window.location.href = '/not-found';
    }
    throw new HttpError(`An error occurred. Status code: ${error.name}`, error.response?.status, error.response?.data)
  }

};

export const authApiAxios = async <T>(config: AxiosRequestConfig, token: string) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return apiAxios<T>(config);
};