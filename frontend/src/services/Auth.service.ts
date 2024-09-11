import { isAxiosError } from 'axios';
import { FormLogin, FormRegister } from '../types/auth-form.type';
import { auth } from '../types/user.type';
import api from '../utils/Axios';

export const registerService = async (formData: FormRegister) => {
  try {
    const { data } = await api.post<auth>('/auth/register', formData);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response && error.response.data.username) {
      throw error;
    }
  }
};

export const loginService = async (formData: FormLogin) => {
  try {
    const { data } = await api.post<auth>('/auth/login', formData);

    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error;
    }
  }
};

export const checkLoginService = async () => {
  try {
    const { data } = await api<auth>('/auth/check-login');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};
