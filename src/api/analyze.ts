import { Request, Response } from 'express';
const apriori = require('apriori');

export default function (req: Request, res: Response) {
  const data = req.body.transactions;

  const Apriori = new apriori.Algorithm(0.01, 0.05, false);
  const results = Apriori.analyze(data);
  res.json({
    result: results.associationRules,
    support: results.frequentItemSets,
  });
}
