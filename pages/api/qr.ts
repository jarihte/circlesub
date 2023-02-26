import { createTransfer } from '@solana/pay';
import { Connection, PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { UserModel } from '../../schemas/user';

async function get(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    label: 'CircleSub',
    icon: 'https://circlesub.com/circlesub-icon.png',
  });
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  // Account provided in the transaction request body by the wallet.
  const accountField = req.body?.account;
  if (!accountField) throw new Error('missing account');

  // Create a PublicKey from the account field.
  const sender = new PublicKey(accountField);

  // Create a connection to the cluster
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC as string);

  // get the tip amount and receiver's address from the query string
  const {
    tip,
    name,
  } = req.query;

  // get the receiver from the database by name
  const user = await UserModel().findOne({ name }).exec();
  const recipient = new PublicKey(user?.sol_address as string);

  // Create a transaction to transfer the tip amount to the receiver.
  const transaction = await createTransfer(connection, sender, {
    recipient,
    amount: new BigNumber(tip as string),
  }, { commitment: 'confirmed' });

  // Serialize and return the unsigned transaction.
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  // Convert the serialized transaction to base64.
  const base64Transaction = serializedTransaction.toString('base64');
  const message = 'Thank you for your tip!';

  // Return the base64 encoded transaction and the message.
  res.status(200).send({ transaction: base64Transaction, message });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return get(req, res);
  }
  if (req.method === 'POST') {
    return post(req, res);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
