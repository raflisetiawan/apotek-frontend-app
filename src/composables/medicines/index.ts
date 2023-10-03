import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { Medicine } from 'src/models/medicine';

export const useGetMedicines = async (
  token: null | string
): Promise<AxiosResponse<Medicine[]>> => {
  try {
    const response = await api.get('/medicines', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }); // Memanggil rute '/medicines' di Laravel

    if (response.status === 200) {
      return response.data; // Mengembalikan data obat jika permintaan berhasil
    } else {
      throw new Error('Gagal mengambil data obat');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        'Terjadi kesalahan dalam mengambil data obat: ' + error.message
      );
    } else {
      throw error;
    }
  }
};
