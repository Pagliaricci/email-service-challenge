import { Request, Response } from 'express';
import userService from '../services/userService';

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const id = parseInt(userId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
