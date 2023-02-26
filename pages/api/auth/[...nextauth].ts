import NextAuth from 'next-auth';
import { connect } from 'mongoose';
import TwitchProvider from 'next-auth/providers/twitch';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { UserModel } from '../../../schemas/user';

connect(process.env.MONGODB_URL as string);

const auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    logo: '/circlesub.png',
    colorScheme: 'light',
  },
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_SECRET as string,
      authorization: {
        params: {
          scope: 'openid user:read:email chat:edit chat:read',
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url }) {
      return url;
    },
    async jwt({ token, user, account }) {
      if (account && user && user.name) {
        await UserModel().findOneAndUpdate({ name: user.name }, {
          name: user.name,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          image: user.image,
          created_at: Date.now(),
        }, { upsert: true }).exec();

        return token;
      }
      return token;
    },
  },
});

export default async function shows(req: NextApiRequest, res: NextApiResponse) {
  return auth(req, res);
}
