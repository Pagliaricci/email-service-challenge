import { Request, Response } from 'express';
import sendEmail from '../services/emailService';

export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const { to, subject, text } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    await sendEmail(to, subject, text, token);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error in sendEmailController:', error);
    res.status(500).json({ message: error.message });
  }
};
