import { MpOrder } from '../types/mercado-pago.type';
import api from '../utils/Axios';

export const mpPreferenceIdService = async (formData: MpOrder) => {
  try {
    const { data } = await api.post('/mercado-pago', formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
