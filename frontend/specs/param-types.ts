import type { OperationType } from './api-types'

export type DateString = `${number}-${number}-${number}`

export interface DateRangeFilter {
  /**
   * Fecha de inicio del rango (inclusive) para filtrar datos.
   * Valor válido: cadena de fecha.
   * Formato esperado: YYYY-MM-DD.
   */
  start_date?: DateString
  /**
   * Fecha de fin del rango (inclusive) para filtrar datos.
   * Valor válido: cadena de fecha.
   * Formato esperado: YYYY-MM-DD.
   */
  end_date?: DateString
}

export interface AlertsParams extends DateRangeFilter {
  /**
   * Umbral mínimo para disparar una alerta.
   * Valores válidos: número mayor o igual a 0.
   */
  threshold: number
}

export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Tipo de operación a incluir en el ranking.
   * Valores válidos: 'income' | 'outcome'.
   */
  operation_type: OperationType
  /**
   * Cantidad máxima de categorías a devolver.
   * Valores válidos: entero positivo (1 o mayor).
   */
  limit: number
}
