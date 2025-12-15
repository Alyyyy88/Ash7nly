import { auth_API } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { LoginRequest, LoginResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginRequest) => auth_API.login(data),
    onSuccess: (data: LoginResponse) => {
      setAuth(data.data.accessToken, data.data.user);
      console.log('Login successful:', data);
      router.replace('/(tabs)/home');
    },

    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useLogOut = () => {
  const { clearAuth } = useAuthStore();
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      clearAuth();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: any) => auth_API.register(data),
  });
};
