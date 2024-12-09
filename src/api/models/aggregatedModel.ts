import {model, Schema} from 'mongoose';
import {Monthly, Weekly, Yearly} from '../../types/Aggregated';

const weeklyAggregatedSchema = new Schema<Weekly>(
  {
    year: {type: Number, required: true},
    week: {type: Number, required: true},
    averageHumidity: {type: Number, required: true},
    averageTemperature: {type: Number, required: true},
    averagePressure: {type: Number, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
  },
  {collection: 'weekly_aggregated'}
);

const monthlyAggregatedSchema = new Schema<Monthly>({
  year: {type: Number, required: true},
  month: {type: Number, required: true},
  averageHumidity: {type: Number, required: true},
  averageTemperature: {type: Number, required: true},
  averagePressure: {type: Number, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
}, {collection: 'monthly_aggregated'});

const yearlyAggregatedSchema = new Schema<Yearly>({
  year: {type: Number, required: true},
  averageHumidity: {type: Number, required: true},
  averageTemperature: {type: Number, required: true},
  averagePressure: {type: Number, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
}, {collection: 'yearly_aggregated'});

export default {
  Weekly: model<Weekly>('WeeklyAggregated', weeklyAggregatedSchema),
  Monthly: model<Monthly>('MonthlyAggregated', monthlyAggregatedSchema),
  Yearly: model<Yearly>('YearlyAggregated', yearlyAggregatedSchema),
};
