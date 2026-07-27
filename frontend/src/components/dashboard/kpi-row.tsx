import { KPICard } from './kpi-card'
import { type KPIMetrics } from '@/lib/financial-types'
import { formatCurrency, formatPercent } from '@/lib/financial-utils'
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react'

interface KPIRowProps {
  metrics: KPIMetrics | null
  loading?: boolean
}

export function KPIRow({ metrics, loading }: KPIRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KPICard
        label="Ingresos totales"
        value={metrics ? formatCurrency(metrics.totalIncome) : '—'}
        helperText="Ingresos acumulados de todos los movimientos"
        icon={TrendingUp}
        variant="income"
        loading={loading}
      />
      <KPICard
        label="Egresos totales"
        value={metrics ? formatCurrency(metrics.totalOutcome) : '—'}
        helperText="Gasto acumulado en todas las categorias"
        icon={TrendingDown}
        variant="outcome"
        loading={loading}
      />
      <KPICard
        label="Utilidad"
        value={metrics ? formatCurrency(metrics.profit) : '—'}
        helperText="Utilidad neta: ingresos menos egresos"
        icon={DollarSign}
        variant="profit"
        loading={loading}
      />
      <KPICard
        label="Margen de utilidad"
        value={metrics ? formatPercent(metrics.profitPercent) : '—'}
        helperText="Utilidad como porcentaje de los ingresos"
        icon={BarChart2}
        variant="profitPercent"
        loading={loading}
      />
    </div>
  )
}
