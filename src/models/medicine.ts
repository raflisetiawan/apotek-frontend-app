export interface Medicine {
  name: string;
  id: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface SelectMedicine {
  id: number;
  name: string;
  label: string;
  value: number;
}
