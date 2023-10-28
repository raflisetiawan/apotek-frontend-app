import { AxiosError } from 'axios';
import { api } from 'src/boot/axios';
import { Cookies } from 'quasar';
import { useUserStore } from 'src/stores/user';

const useUser = async (token: null | string, refreshToken: null | string) => {
  try {
    const response = await api.get('auth/profile', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        const response = await api.post('auth/refresh-token', {
          headers: {
            Authorization: 'Bearer ' + refreshToken,
            'Content-Type': 'application/json',
          },
        });
        Cookies.set('token', response.data.accessToken);
        return response;
      }
    }
    const { logout } = useUserStore();
    await logout();
    throw error;
  }
};

export { useUser };
