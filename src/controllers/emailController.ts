import { Request, Response } from 'express';
import sendEmail from '../services/emailService';

export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const { to, subject, text } = req.body;
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
