import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';

export interface TransactionWithMedicines {
  name: string;
  medicines: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export const useGetTransactions = async (
  token: string | null
): Promise<AxiosResponse> => {
  const response = await api.get('transaction', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response;
};
