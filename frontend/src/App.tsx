import { lazy, Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import { useFinancialDashboardData } from "@/lib/use-financial-dashboard-data";

const IncomeOutcomeChart = lazy(() =>
  import("@/components/dashboard/income-outcome-chart").then((module) => ({
    default: module.IncomeOutcomeChart,
  })),
);

const ProfitPercentChart = lazy(() =>
  import("@/components/dashboard/profit-percent-chart").then((module) => ({
    default: module.ProfitPercentChart,
  })),
);

function App() {
  const { metrics, monthlyData, periodLabel, loading, error } =
    useFinancialDashboardData();

  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      <main
        id="contenido-principal"
        tabIndex={-1}
        aria-busy={loading}
        className="min-h-screen bg-background text-foreground"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div aria-live="polite" className="sr-only">
              {loading ? "Cargando panel financiero" : "Panel financiero cargado"}
            </div>
            <DashboardHeader period={periodLabel} />

            {error ? (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground"
              >
                {error}
              </div>
            ) : null}

            <section aria-labelledby="kpi-heading">
              <h2 id="kpi-heading" className="sr-only">
                Indicadores clave
              </h2>
              <KPIRow metrics={metrics} loading={loading} />
            </section>

            <section
              aria-labelledby="charts-heading"
              className="grid grid-cols-1 gap-4 xl:grid-cols-2"
            >
              <h2 id="charts-heading" className="sr-only">
                Graficos financieros
              </h2>
              <Suspense
                fallback={
                  <div className="col-span-full rounded-lg border border-border/60 bg-card p-4 text-sm text-muted-foreground">
                    Cargando modulos de visualizacion...
                  </div>
                }
              >
                <IncomeOutcomeChart data={monthlyData} loading={loading} />
                <ProfitPercentChart data={monthlyData} loading={loading} />
              </Suspense>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
