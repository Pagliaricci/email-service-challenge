
import { Request, Response } from 'express';
import statisticsService from '../services/statisticsService';

export const statsController = async (req: Request, res: Response) => {
  try {
    const stats = await statisticsService.getStatistics();
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
