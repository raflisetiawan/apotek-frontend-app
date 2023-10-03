import { Medicine } from './medicine';

export interface TransactionWithMedicines {
  name: string;
  medicines: Medicine[];
  id: number;
  price: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
