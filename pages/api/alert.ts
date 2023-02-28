import tmi from 'tmi.js';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { connect } from 'mongoose';
import { UserModel } from '../../schemas/user';

connect(process.env.MONGODB_URL as string);

export default async function shows(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret });

  // get the tip amount and receiver name from the query string
  const r = req.query;
  const receiver = r.name as string;
  let donor;
  if (token) {
    donor = token.name;
  } else {
    donor = 'viewer';
  }
  const amount = r.tip as string;

  // get the user's access token and refresh token
  const user = await UserModel().findOne({ name: receiver }).exec();
  if (user) {
    let accessToken = user.access_token;
    let refreshToken = user.refresh_token;

    // validate the access token
    const response = await axios('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      validateStatus: () => true,
    });

    // if the access token is invalid, refresh it
    if (response.status === 401) {
      const response2 = await axios('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        params: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_SECRET,
        },
        validateStatus: () => true,
      });
      accessToken = response2.data.access_token;
      refreshToken = response2.data.refresh_token;
      user.access_token = accessToken;
      user.refresh_token = refreshToken;
      await user.save();
    }

    // send a message to the user's twitch channel
    const client = new tmi.Client({
      options: { debug: true },
      identity: {
        username: receiver,
        password: `oauth:${accessToken}`,
      },
      channels: [`#${receiver}`],
    });
    await client.connect();
    client.say(`#${receiver}`, `Thanks ${donor} for your tip of $${amount} via CircleSub!`);
    await client.disconnect();
  }

  res.json({ received: true });
}
