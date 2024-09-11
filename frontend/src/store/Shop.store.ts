import { create } from 'zustand';
import { MpOrder } from '../types/mercado-pago.type';
import { mpPreferenceIdService } from '../services/MercadoPago.service';

interface IShopStore {
  mpPreferenceId: (formData: MpOrder) => Promise<void>;
  isLoadingShop: boolean;
  preferenceId: string | null;
  order: MpOrder | null;
}

export const ShopStore = create<IShopStore>((set) => ({
  isLoadingShop: false,
  mpPreferenceId: async (formData: MpOrder) => {
    try {
      set({ isLoadingShop: true, order: formData });
      const data = await mpPreferenceIdService(formData);
      if (data) {
        set({ isLoadingShop: false, preferenceId: data });
      }
    } catch (error) {
      console.log(error);
      set({ isLoadingShop: false, order: null });
    }
  },
  preferenceId: 'asdasd',
  order: null,
}));
