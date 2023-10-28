import { SelectMedicine } from './medicine';

export interface TransactionWithMedicines {
  name: string;
  medicines: SelectMedicine[];
  id: number;
  price: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface Transaction {
  idTransaksi: number;
  nama: string;
  tanggal: string;
  harga: string;
}

export interface TransactionUpdateProps {
  data: Transaction;
  index: number;
}
export interface TransactionRowUpdateModel {
  row: Transaction;
  index: number;
}

export interface Itemset {
  support: number;
  items: string[];
}

export interface AssociationRulesItems {
  confidence: number;
  lhs: string[];
  rhs: string[];
}
