import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "./financial-types";

function toYearMonthKey(value: Date): string {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthYearLabel(yearMonthKey: string): string {
  const [yearText, monthText] = yearMonthKey.split("-");
  const year = Number(yearText);
  const month = Number(monthText) - 1;
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function computeKPIs(movements: FinancialMovement[]): KPIMetrics {
  let totalIncome = 0;
  let totalOutcome = 0;

  for (const movement of movements) {
    if (movement.operation_type === "income") {
      totalIncome += movement.amount;
      continue;
    }

    totalOutcome += movement.amount;
  }

  const profit = totalIncome - totalOutcome;
  const profitPercent = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  return { totalIncome, totalOutcome, profit, profitPercent };
}

export function computeMonthlyData(
  movements: FinancialMovement[],
): MonthlyDataPoint[] {
  const monthlyMap = new Map<string, { income: number; outcome: number }>();

  for (const movement of movements) {
    const yearMonthKey = toYearMonthKey(new Date(movement.create_date));
    const currentTotals = monthlyMap.get(yearMonthKey) ?? { income: 0, outcome: 0 };

    if (movement.operation_type === "income") {
      currentTotals.income += movement.amount;
    } else {
      currentTotals.outcome += movement.amount;
    }

    monthlyMap.set(yearMonthKey, currentTotals);
  }

  return Array.from(monthlyMap.entries())
    .sort()
    .map(([yearMonthKey, totals]) => {
      const { income, outcome } = totals;
      const profit = income - outcome;
      const profitPercent = income > 0 ? (profit / income) * 100 : 0;
      return {
        month: formatMonthYearLabel(yearMonthKey),
        income,
        outcome,
        profitPercent,
      };
    });
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
