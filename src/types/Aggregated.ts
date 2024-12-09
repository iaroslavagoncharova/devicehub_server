type Weekly = {
  year: number;
  week: number;
  averageHumidity: number;
  averageTemperature: number;
  averagePressure: number;
  startDate: Date;
  endDate: Date;
};

type Monthly = {
  year: number;
  month: number;
  averageHumidity: number;
  averageTemperature: number;
  averagePressure: number;
  startDate: Date;
  endDate: Date;
};

type Yearly = {
  year: number;
  averageHumidity: number;
  averageTemperature: number;
  averagePressure: number;
  startDate: Date;
  endDate: Date;
};

export {Weekly, Monthly, Yearly};