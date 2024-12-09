import express from 'express';
import {
  weeklyAggregation,
  monthlyAggregation,
  yearlyAggregation,
  getAggregatedWeekly,
  getAggregatedMonthly,
  getAggregatedYearly,
} from '../controllers/aggregationController';

const router = express.Router();

router.route('/weekly').get(getAggregatedWeekly).post(weeklyAggregation);
router.route('/monthly').post(monthlyAggregation).get(getAggregatedMonthly);
router.route('/yearly').post(yearlyAggregation).get(getAggregatedYearly);

export default router;
