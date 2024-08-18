
import { Request, Response } from 'express';
import authService from '../services/authService';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
   
    const user = await authService.register(username, password, role);
    res.status(201).json({ token: user.token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
