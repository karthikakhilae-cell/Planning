import { motion } from "motion/react";
import { Activity, BarChart3, Database, Gauge, LineChart, TimerReset } from "lucide-react";

interface AnalyticsVisualsProps {
  projectCount: number;
}

const kpis = [
  { label: "Project archive", value: "18+", detail: "case studies", icon: Database },
  { label: "Schedule lift", value: "42%", detail: "faster audit cycles", icon: TimerReset },
  { label: "Query gain", value: "65%", detail: "response-time improvement", icon: Gauge },
  { label: "Automation", value: "24/7", detail: "monitoring mindset", icon: Activity },
];

const categories = [
  { label: "BI", value: 88, color: "bg-[#267365]" },
  { label: "SQL", value: 78, color: "bg-[#5A5A40]" },
  { label: "AI", value: 70, color: "bg-[#C06C54]" },
  { label: "P6", value: 64, color: "bg-[#314E52]" },
  { label: "Ops", value: 58, color: "bg-[#D9A441]" },
];

const pipeline = [
  { name: "Ingest", value: "1.2M", detail: "rows normalized" },
  { name: "Model", value: "14", detail: "semantic layers" },
  { name: "Report", value: "32", detail: "decision views" },
];

export default function AnalyticsVisuals({ projectCount }: AnalyticsVisualsProps) {
  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-24 md:py-36 bg-[#ECE7DD]">
      <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="xl:sticky xl:top-28"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-5 block">
            Analytics Command View
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display leading-[0.9] tracking-tight mb-8">
            Visual proof of <span className="text-accent">planning</span> intelligence.
          </h2>
          <p className="max-w-xl text-muted leading-relaxed font-light">
            A snapshot of the kind of decision systems Akhil builds: schedule health, data platform throughput,
            portfolio coverage, KPI design, and operational performance brought into one readable layer.
          </p>
        </motion.div>

        <div className="space-y-5 md:space-y-6">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon;
              const value = index === 0 ? `${Math.max(projectCount, 18)}+` : kpi.value;
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-line/10 p-5 shadow-xl shadow-ink/5"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted/60">
                      {kpi.label}
                    </span>
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-4xl font-display leading-none">{value}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest font-bold text-muted/50">
                    {kpi.detail}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-5 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-line/10 p-6 md:p-8 shadow-xl shadow-ink/5"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                    Portfolio Coverage
                  </div>
                  <h3 className="text-2xl font-display">Capability mix</h3>
                </div>
                <BarChart3 className="w-5 h-5 text-accent" />
              </div>

              <div className="space-y-5">
                {categories.map((item, index) => (
                  <div key={item.label} className="grid grid-cols-[42px_1fr_42px] gap-4 items-center">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted">{item.label}</div>
                    <div className="h-3 bg-bg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.08 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                    <div className="text-xs font-bold text-ink/70 text-right">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#172120] text-white border border-white/10 p-6 md:p-8 shadow-xl shadow-ink/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">
                    Schedule Health
                  </div>
                  <h3 className="text-2xl font-display">Risk trend</h3>
                </div>
                <LineChart className="w-5 h-5 text-[#D9A441]" />
              </div>

              <svg viewBox="0 0 360 190" className="w-full h-auto" role="img" aria-label="Risk trend line chart">
                <path d="M20 150H340" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M20 105H340" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <path d="M20 60H340" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  d="M24 134 C72 118, 80 92, 122 98 C164 104, 166 58, 212 70 C260 82, 278 44, 336 38"
                  fill="none"
                  stroke="#D9A441"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path d="M24 134 C72 118, 80 92, 122 98 C164 104, 166 58, 212 70 C260 82, 278 44, 336 38 L336 160 L24 160Z" fill="rgba(217,164,65,0.12)" />
                {[24, 122, 212, 336].map((x, i) => (
                  <circle key={x} cx={x} cy={[134, 98, 70, 38][i]} r="5" fill="#F5F2ED" />
                ))}
              </svg>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {pipeline.map((item) => (
                  <div key={item.name} className="border border-white/10 p-4">
                    <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{item.name}</div>
                    <div className="text-2xl font-display mt-2">{item.value}</div>
                    <div className="text-[10px] text-white/45 mt-1 leading-snug">{item.detail}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-5 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-line/10 p-6 md:p-8 shadow-xl shadow-ink/5"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                KPI Balance
              </div>
              <h3 className="text-2xl font-display mb-8">Decision focus</h3>
              <div className="relative mx-auto w-56 h-56">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" role="img" aria-label="Decision focus donut chart">
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#F5F2ED" strokeWidth="18" />
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#267365" strokeWidth="18" strokeDasharray="118 276" />
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#C06C54" strokeWidth="18" strokeDasharray="78 276" strokeDashoffset="-118" />
                  <circle cx="60" cy="60" r="44" fill="none" stroke="#D9A441" strokeWidth="18" strokeDasharray="56 276" strokeDashoffset="-196" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-display">3x</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted/60">signal layers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-line/10 p-6 md:p-8 shadow-xl shadow-ink/5"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">
                Operating Metrics
              </div>
              <h3 className="text-2xl font-display mb-8">Planning dashboard</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "SPI", value: "0.96", note: "schedule index" },
                  { label: "CPI", value: "1.08", note: "cost index" },
                  { label: "Float", value: "18d", note: "critical buffer" },
                ].map((metric) => (
                  <div key={metric.label} className="bg-bg p-5 border border-line/10">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-accent">{metric.label}</div>
                    <div className="text-4xl font-display mt-4">{metric.value}</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-muted/50 mt-2">{metric.note}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-bg p-5 border border-line/10">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-muted/60 mb-4">
                  <span>Automation readiness</span>
                  <span>82%</span>
                </div>
                <div className="h-3 bg-white overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="h-full bg-[#267365]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
