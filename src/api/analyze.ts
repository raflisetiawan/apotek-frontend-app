import { Request, Response } from 'express';
const apriori = require('apriori');

export default function (req: Request, res: Response) {
  // const data = req.body.transactions;
  const data = [
    ['a', 'b', 'c'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b'],
    ['a', 'b', 'd'],
    ['a', 'c', 'd'],
    ['a', 'c', 'd'],
  ];

  const Apriori = new apriori.Algorithm(0.01, 0.05, false);
  const results = Apriori.analyze(data);
  res.json({ result: results.associationRules });
}
