import { Request, Response } from 'express';
import { Apriori, Itemset, IAprioriResults } from 'node-apriori';

export default function (req: Request, res: Response) {
  // const { transactions } = req.body; // Mengambil data transaksi dari permintaan klien
  const transactions: string[][] = req.body.transactions;

  const apriori: Apriori<string> = new Apriori<string>(0.4);

  // Returns itemsets 'as soon as possible' through events.
  apriori.on('data', (itemset: Itemset<number>) => {
    // Do something with the frequent itemset.
    const support: number = itemset.support;
    const items: number[] = itemset.items;
  });

  // Execute Apriori on a given set of transactions.
  apriori.exec(transactions).then((result: IAprioriResults<string>) => {
    // Returns both the collection of frequent itemsets and execution time in millisecond.
    const frequentItemsets: Itemset<string>[] = result.itemsets;
    const executionTime: number = result.executionTime;
    res.json({ frequentItemsets, executionTime });
  });
}
