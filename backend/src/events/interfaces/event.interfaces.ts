export interface ISearchEventParams {
  title?: string;
  description?: string;
  date?: IDateRange;
  userId?: string;
}

export interface IDateRange {
  from?: Date;
  to?: Date;
}
