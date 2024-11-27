import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import SendEmail from "../../components/SendEmail/SendEmail"

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const orderId = req.query.orderId
  const email = req.query.email
  try {
    const data = await resend.emails.send({
      from: 'Girts <girts@email.thaoellen.com>',
      to: [`${email}`],
      subject: 'Cảm ơn bạn đã đặt hàng!',
      react: SendEmail({orderId: `${orderId}` }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
