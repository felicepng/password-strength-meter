// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

type UserCredentials = {
  username: string;
  password: string;
};

const SHARED_KEY = process.env.SHARED_KEY || 'CS440';
const BUFFER: UserCredentials[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCredentials>
) {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const payload = { username, password: hash };

  BUFFER.push({ username, password: hash });

  res.status(200).json(payload);
}
