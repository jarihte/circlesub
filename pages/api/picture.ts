import { NextApiRequest, NextApiResponse } from 'next/types';
import { UserModel } from '../../schemas/user';

export default async function shows(req: NextApiRequest, res: NextApiResponse) {
  // get the user's name from the query string
  const r = req.query;
  const name = r.u as string;

  // return the user's SOL wallet address and image
  const receiver = await UserModel().findOne({ name }).exec();
  res.send({ image: receiver?.image, sol_address: receiver?.sol_address });
}
