import { Transaction } from 'src/models/transaction';

export const useYearMonthDate = (data: Transaction) => {
  const date = new Date(data.tanggal);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}/${month}/${day}`;
};
export const useDateMonthYear = (data: string) => {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export function useIsDdmmyy(dateString: string) {
  // Definisikan pola regex untuk format "dd/mm/yyyy"
  const datePattern = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

  // Gunakan metode test untuk memeriksa apakah string sesuai dengan pola
  return datePattern.test(dateString);
}
