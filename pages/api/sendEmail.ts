import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import SendEmail from "../../components/SendEmail/SendEmail"

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: 'Girts <girts@email.thaoellen.com>',
      to: ['girts521@gmail.com'],
      subject: 'Hello world',
      react: SendEmail({ firstName: 'John' }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
