import ruuviModel from '../models/ruuviModel';
import WeeklyAggregated from '../models/aggregatedModel';
import MonthlyAggregated from '../models/aggregatedModel';
import YearlyAggregated from '../models/aggregatedModel';

export const aggregateWeeklyData = async () => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const existingAggregatedData = await ruuviModel.aggregate([
      {
        $match: {
          timestamp: {$gte: sevenDaysAgo},
        },
      },
      {
        $group: {
          _id: {week: {$week: '$timestamp'}, year: {$year: '$timestamp'}},
          averageHumidity: {$avg: '$data.humidity'},
          averageTemperature: {$avg: '$data.temperature'},
          averagePressure: {$avg: '$data.pressure'},
          startDate: {$min: '$timestamp'},
          endDate: {$max: '$timestamp'},
        },
      },
    ]);

    console.log('Existing aggregated data:', existingAggregatedData);
    // Now, perform aggregation, but only for data that hasn’t been aggregated.
    const newAggregatedData = await ruuviModel.aggregate([
      {$match: {timestamp: {$lt: sevenDaysAgo}}}, // Only consider data older than the last 7 days
      {
        $group: {
          _id: {week: {$week: '$timestamp'}, year: {$year: '$timestamp'}},
          averageHumidity: {$avg: '$data.humidity'},
          averageTemperature: {$avg: '$data.temperature'},
          averagePressure: {$avg: '$data.pressure'},
          startDate: {$min: '$timestamp'},
          endDate: {$max: '$timestamp'},
        },
      },
      {$sort: {'_id.year': -1, '_id.week': -1}},
      {
        $project: {
          year: '$_id.year',
          week: '$_id.week',
          averageHumidity: 1,
          averageTemperature: 1,
          averagePressure: 1,
          startDate: 1,
          endDate: 1,
        },
      },
      {
        $out: 'weekly_aggregated',
      },
    ]);

    if (newAggregatedData) {
      console.log('Weekly aggregation successful');
      return true;
    } else {
      console.log('No new data to aggregate');
    }
  } catch (error) {
    console.error('Error during weekly aggregation:', error);
  }
};

export const aggregateMonthlyData = async () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const firstDayOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);

  try {
    const monthlyResult = await ruuviModel.aggregate([
      {$match: {timestamp: {$lt: firstDayOfCurrentMonth}}},
      {
        $group: {
          _id: {month: {$month: '$timestamp'}, year: {$year: '$timestamp'}},
          averageHumidity: {$avg: '$data.humidity'},
          averageTemperature: {$avg: '$data.temperature'},
          averagePressure: {$avg: '$data.pressure'},
          startDate: {$min: '$timestamp'},
          endDate: {$max: '$timestamp'},
        },
      },
      {$sort: {'_id.year': -1, '_id.month': -1}},
      {
        $project: {
          year: '$_id.year',
          month: '$_id.month',
          averageHumidity: 1,
          averageTemperature: 1,
          averagePressure: 1,
          startDate: 1,
          endDate: 1,
        },
      },
      {
        $out: 'monthly_aggregated',
      },
    ]);

    if (monthlyResult && monthlyResult.length > 0) {
      console.log('Monthly aggregation successful');
      return true;
    } else {
      console.log('No monthly aggregation data found');
    }
  } catch (error) {
    console.error('Error during monthly aggregation:', error);
  }
};

export const aggregateYearlyData = async () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const firstDayOfCurrentYear = new Date(currentYear, 0, 1);

  try {
    const yearlyResult = await ruuviModel.aggregate([
      {$match: {timestamp: {$lt: firstDayOfCurrentYear}}},
      {
        $group: {
          _id: {year: {$year: '$timestamp'}},
          averageHumidity: {$avg: '$data.humidity'},
          averageTemperature: {$avg: '$data.temperature'},
          averagePressure: {$avg: '$data.pressure'},
          startDate: {$min: '$timestamp'},
          endDate: {$max: '$timestamp'},
        },
      },
      {$sort: {'_id.year': -1}},
      {
        $project: {
          year: '$_id.year',
          averageHumidity: 1,
          averageTemperature: 1,
          averagePressure: 1,
          startDate: 1,
          endDate: 1,
        },
      },
      {
        $out: 'yearly_aggregated',
      },
    ]);

    if (yearlyResult && yearlyResult.length > 0) {
      console.log('Yearly aggregation successful');
      return true;
    } else {
      console.log('No data for yearly aggregation');
    }
  } catch (error) {
    console.error('Error during yearly aggregation:', error);
  }
};

export const getAggregatedWeeklyData = async () => {
  try {
    // fetch all data from weekly_aggregated collection
    const result = await WeeklyAggregated.Weekly.find({});
    console.log('Weekly aggregated data:', result);
    if (result) {
      return result;
    } else {
      console.log('No weekly aggregated data found');
    }
  } catch (error) {
    console.error('Error during weekly aggregation:', error);
  }
};

export const getAggregatedMonthlyData = async () => {
  try {
    // fetch all data from monthly_aggregated collection
    const result = await MonthlyAggregated.Monthly.find({});
    console.log('Monthly aggregated data:', result);
    if (result) {
      return result;
    } else {
      console.log('No monthly aggregated data found');
    }
  } catch (error) {
    console.error('Error during monthly aggregation:', error);
  }
};

export const getAggregatedYearlyData = async () => {
  try {
    // fetch all data from yearly_aggregated collection
    const result = await YearlyAggregated.Yearly.find({});
    console.log('Yearly aggregated data:', result);
    if (result) {
      return result;
    } else {
      console.log('No yearly aggregated data found');
    }
  } catch (error) {
    console.error('Error during yearly aggregation:', error);
  }
};
