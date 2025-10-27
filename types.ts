
export enum Operator {
  EQUALS = 'equals',
  NOT_EQUALS = 'does not equal',
  GREATER_THAN = 'is greater than',
  LESS_THAN = 'is less than',
  CONTAINS = 'contains',
}

export interface Filter {
  id: number;
  column: string;
  operator: Operator;
  value: string;
}

export enum ScheduleFrequency {
    NOT_SCHEDULED = 'Not Scheduled',
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
}

export interface Schedule {
    frequency: ScheduleFrequency;
    time: string; // "HH:MM"
    dayOfWeek?: number; // 0 for Sunday, 1 for Monday, etc.
    dayOfMonth?: number; // 1-31
}
