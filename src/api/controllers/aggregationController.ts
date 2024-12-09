import {Request, Response, NextFunction} from 'express';
import {
  aggregateWeeklyData,
  aggregateMonthlyData,
  aggregateYearlyData,
  getAggregatedWeeklyData,
  getAggregatedMonthlyData,
  getAggregatedYearlyData,
} from '../services/aggregationService';

export const weeklyAggregation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await aggregateWeeklyData();
    if (result === true) {
      res.status(200).json({message: 'Aggregation completed successfully.'});
    } else {
      res.status(500).json({message: 'Aggregation failed.'});
    }
  } catch (error) {
    next(error);
  }
};

export const monthlyAggregation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await aggregateMonthlyData();
    if (result === true) {
      res.status(200).json({message: 'Aggregation completed successfully.'});
    } else {
      res.status(500).json({message: 'Aggregation failed.'});
    }
  } catch (error) {
    next(error);
  }
};

export const yearlyAggregation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await aggregateYearlyData();
    if (result === true) {
      res.status(200).json({message: 'Aggregation completed successfully.'});
    } else {
      res.status(500).json({message: 'Aggregation failed.'});
    }
  } catch (error) {
    next(error);
  }
};

export const getAggregatedWeekly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAggregatedWeeklyData();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'No data found.'});
    }
  } catch (error) {
    next(error);
  }
};

export const getAggregatedMonthly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAggregatedMonthlyData();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'No data found.'});
    }
  } catch (error) {
    next(error);
  }
};

export const getAggregatedYearly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAggregatedYearlyData();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'No data found.'});
    }
  } catch (error) {
    next(error);
  }
};
