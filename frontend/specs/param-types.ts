import type { OperationType } from './api-types'

export type DateString = `${number}-${number}-${number}`

export interface DateRangeFilter {
  start_date?: DateString
  end_date?: DateString
}

export interface AlertsParams extends DateRangeFilter {
  threshold: number
}

export interface TopCategoriesParams extends DateRangeFilter {
  operation_type: OperationType
  limit: number
}
