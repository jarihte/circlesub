/* eslint-disable no-restricted-syntax */
import { NextApiRequest, NextApiResponse } from 'next/types';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';
import type { Server as HTTPServer } from 'http';

interface SocketServer extends HTTPServer {
  io: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

interface TransferTransaction {
  accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: never[];
  }[];
  description: string;
  events: Record<string, never>;
  fee: number;
  feePayer: string;
  instructions: {
    accounts: string[];
    data: string;
    innerInstructions: never[];
    programId: string;
  }[];
  nativeTransfers: {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
  }[];
  signature: string;
  slot: number;
  source: string;
  timestamp: number;
  tokenTransfers: never[];
  transactionError: null;
  type: string;
}

async function post(req: NextApiRequest, res: NextApiResponseWithSocket) {
  const { body } = req;
  const json : TransferTransaction[] = body;
  await fetch(`https://${process.env.NEXT_PUBLIC_QR_URL}/api/socket`);

  for (const tx of json) {
    for (const transfer of tx.nativeTransfers) {
      const { amount } = transfer;
      const from = transfer.fromUserAccount;
      const to = transfer.toUserAccount;
      const txMsg = { to, from, amount };
      res?.socket?.server?.io?.emit('transfer', txMsg);
    }
  }

  res.send({ ok: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (req.method === 'POST') {
    return post(req, res);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
