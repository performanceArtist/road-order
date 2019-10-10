export type StrictTaskFilters = {
  startDate: Date;
  endDate: Date;
  condor: number;
  user: number;
}

export type TaskFilters = Partial<StrictTaskFilters>;