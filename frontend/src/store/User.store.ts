import { create } from 'zustand';
import { UserEntity } from '../types/user.type';
import { FormLogin, FormRegister } from '../types/auth-form.type';
import {
  checkLoginService,
  loginService,
  registerService,
} from '../services/Auth.service';

type IUserStore = {
  user: UserEntity | null;
  isAuthenticated: boolean;
  messageError: string;
  messageSuccess: string;
  isLoading: boolean;
  googleAuth: (token: string) => Promise<void>;
  register: (formData: FormRegister) => Promise<void>;
  login: (formData: FormLogin) => Promise<void>;
  checkLogin: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
  clearSuccess: () => void;
};

export const userStore = create<IUserStore>((set, get) => ({
  user: null,
  isAuthenticated: localStorage.getItem('isAuthenticated') == 'true',
  messageError: '',
  messageSuccess: '',
  isLoading: false,
  register: async (formData: FormRegister) => {
    localStorage.removeItem('AUTH_TOKEN');
    set({ isLoading: true });
    try {
      const data = await registerService(formData);
      if (data) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('AUTH_TOKEN', data.token);
        set({
          user: data.userEntity,
          messageSuccess: 'Registro exitoso',
          isLoading: false,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        user: null,
        isAuthenticated: false,
        messageError: 'No se pudo registrar',
        isLoading: false,
      });
    }
  },
  login: async (formData: FormLogin) => {
    localStorage.removeItem('AUTH_TOKEN');
    set({ isLoading: true });
    try {
      const data = await loginService(formData);
      if (data) {
        localStorage.setItem('AUTH_TOKEN', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        set({
          user: data.userEntity,
          isAuthenticated: true,
          messageSuccess: 'Login exitoso',
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        user: null,
        isAuthenticated: false,
        messageError: 'No se pudo loguear',
        isLoading: false,
      });
    }
  },
  checkLogin: async () => {
    set({ isLoading: true });
    try {
      const data = await checkLoginService();
      if (data) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('AUTH_TOKEN', data.token);
        set({
          user: data.userEntity,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.log(get().isAuthenticated);
      console.log(error);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('AUTH_TOKEN');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  clearError: () => set({ messageError: '' }),
  clearSuccess: () => set({ messageSuccess: '' }),
  logout: () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false, user: null });
  },
  googleAuth: async (token: string) => {
    localStorage.setItem('AUTH_TOKEN', token);
    await get().checkLogin();
  },
}));
