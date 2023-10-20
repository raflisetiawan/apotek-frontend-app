interface Transaction {
  idTransaksi: number;
  tanggal: string;
  nama: string;
  harga: string;
}

interface GroupedData {
  [key: string]: Transaction[];
}

export const useGroupbyTanggal = (data: any) => {
  const groupedData: GroupedData = data.reduce((acc: any, item: any) => {
    const { tanggal, ...rest } = item;
    if (!acc[tanggal]) {
      acc[tanggal] = [];
    }
    acc[tanggal].push({ tanggal, ...rest });
    return acc;
  }, {} as GroupedData);
  return groupedData;
};
