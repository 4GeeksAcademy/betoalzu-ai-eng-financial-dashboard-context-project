/**
 * Tipo de operación financiera registrada.
 * Valores válidos: 'income' | 'outcome'.
 */
export type OperationType = 'income' | 'outcome'
/**
 * Categoría contable de un movimiento.
 * Valores válidos: 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'.
 */
export type Category = 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'
/**
 * Modelo comercial asociado al movimiento.
 * Valores válidos: 'B2B' | 'B2C'.
 */
export type BusinessType = 'B2B' | 'B2C'

export interface FacetsResponse {
  /**
   * Tipos de operación disponibles para filtrar en la UI.
   * Valores válidos: lista de 'income' y/o 'outcome'.
   */
  operation_types: OperationType[]
  /**
   * Tipos de negocio disponibles para filtrar en la UI.
   * Valores válidos: lista de 'B2B' y/o 'B2C'.
   */
  business_types: BusinessType[]
  /**
   * Categorías disponibles para filtrar o agrupar información.
   * Valores válidos: lista de categorías definidas en Category.
   */
  categories: Category[]
  /**
   * Fecha mínima disponible en el dataset.
   * Valor válido: cadena de fecha.
   * Formato esperado: YYYY-MM-DD.
   */
  min_date: string
  /**
   * Fecha máxima disponible en el dataset.
   * Valor válido: cadena de fecha.
   * Formato esperado: YYYY-MM-DD.
   */
  max_date: string
}

export interface AlertEntry {
  /**
   * Periodo evaluado para la alerta.
   * Valor válido: cadena representando un periodo temporal.
   */
  period: string
  /**
   * Total de egresos del periodo.
   * Valores válidos: número mayor o igual a 0.
   */
  outcome_total: number
  /**
   * Promedio base de egresos usado como referencia.
   * Valores válidos: número mayor o igual a 0.
   */
  baseline_average: number
  /**
   * Razón de incremento respecto al promedio base.
   * Valores válidos: número mayor o igual a 0.
   */
  increase_ratio: number
}

export interface AlertsResponse extends Array<AlertEntry> {}

export interface CategoryEntry {
  /**
   * Categoría agregada en el resultado.
   * Valores válidos: categorías definidas en Category.
   */
  category: Category
  /**
   * Tipo de operación de la categoría agregada.
   * Valores válidos: 'income' | 'outcome'.
   */
  operation_type: OperationType
  /**
   * Monto total acumulado para la categoría.
   * Valores válidos: número mayor o igual a 0.
   */
  total_amount: number
}

export interface TopCategoriesResponse extends Array<CategoryEntry> {}
