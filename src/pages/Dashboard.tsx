import { motion } from "motion/react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Database,
  Gauge,
  GitBranch,
  LineChart,
  Network,
  ShieldCheck,
  TimerReset,
  TrendingUp,
} from "lucide-react";

const executiveKpis = [
  { label: "Portfolio Health", value: "91.4%", trend: "+7.8%", note: "weighted score", icon: ShieldCheck },
  { label: "Schedule SPI", value: "0.96", trend: "-0.03", note: "near threshold", icon: Gauge },
  { label: "Cost CPI", value: "1.08", trend: "+0.06", note: "favorable", icon: CircleDollarSign },
  { label: "Critical Float", value: "18d", trend: "+4d", note: "recovered", icon: TimerReset },
  { label: "Forecast EAC", value: "$7.42M", trend: "-3.2%", note: "against baseline", icon: TrendingUp },
  { label: "Data Freshness", value: "14m", trend: "live", note: "last pipeline run", icon: Database },
];

const sCurvePoints = {
  pv: "M28 234 C78 218, 110 190, 146 158 C190 118, 238 88, 314 72 C380 58, 438 54, 520 48",
  ev: "M28 238 C82 226, 116 207, 154 178 C202 142, 240 117, 306 102 C368 88, 430 80, 520 76",
  ac: "M28 240 C76 230, 108 214, 148 190 C198 158, 248 132, 316 116 C384 102, 438 92, 520 84",
};

const wbsProgress = [
  { label: "Engineering", plan: 92, actual: 88 },
  { label: "Procurement", plan: 84, actual: 79 },
  { label: "Civil", plan: 71, actual: 68 },
  { label: "MEP", plan: 63, actual: 57 },
  { label: "Commissioning", plan: 34, actual: 29 },
];

const riskMatrix = [
  ["low", "low", "medium", "medium", "high"],
  ["low", "medium", "medium", "high", "high"],
  ["medium", "medium", "high", "high", "critical"],
  ["medium", "high", "high", "critical", "critical"],
  ["high", "high", "critical", "critical", "critical"],
];

const milestones = [
  { label: "IFC package", date: "03 Jun", state: "done" },
  { label: "Long-lead PO", date: "18 Jun", state: "done" },
  { label: "Civil handover", date: "09 Jul", state: "active" },
  { label: "MEP clearance", date: "26 Jul", state: "watch" },
  { label: "Commissioning", date: "17 Aug", state: "risk" },
];

const workstreams = [
  { label: "Lakehouse ingestion", value: 94, color: "bg-[#267365]" },
  { label: "Schedule audit automation", value: 86, color: "bg-[#314E52]" },
  { label: "Power BI semantic model", value: 78, color: "bg-[#D9A441]" },
  { label: "SQL tuning backlog", value: 69, color: "bg-[#C06C54]" },
];

const varianceBands = [
  { label: "Schedule", value: 76, delta: "-4.2%", color: "#D9A441" },
  { label: "Cost", value: 88, delta: "+6.8%", color: "#267365" },
  { label: "Scope", value: 82, delta: "+1.9%", color: "#314E52" },
  { label: "Risk", value: 64, delta: "-8.1%", color: "#C06C54" },
];

const earnedValuePulse = [
  { label: "PV", value: "$5.82M", percent: 84, color: "bg-[#314E52]" },
  { label: "EV", value: "$5.41M", percent: 78, color: "bg-[#267365]" },
  { label: "AC", value: "$5.17M", percent: 74, color: "bg-[#C06C54]" },
];

const reconciliation = [
  { label: "Baseline", value: "$5.82M", width: 92, color: "bg-[#314E52]" },
  { label: "Earned", value: "$5.41M", width: 84, color: "bg-[#267365]" },
  { label: "Actual", value: "$5.17M", width: 78, color: "bg-[#C06C54]" },
  { label: "Forecast", value: "$7.42M", width: 100, color: "bg-[#D9A441]" },
];

const cashflow = [38, 44, 62, 71, 92, 86, 110, 104, 122, 116, 136, 128];
const resourceLoad = [72, 84, 68, 92, 76, 88, 62, 96, 82, 70, 90, 78];
const commandStats = [
  ["Portfolio", "18 active packages"],
  ["Refresh", "14 min ago"],
  ["Confidence", "High"],
  ["Forecast", "Q4 stable"],
];

function SparkBars({ values, color = "bg-accent" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-24 items-end gap-2 rounded-lg bg-bg/70 p-3 ring-1 ring-line/10">
      {values.map((value, index) => (
        <motion.div
          key={`${value}-${index}`}
          initial={{ height: 0 }}
          whileInView={{ height: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.03 }}
          className={`min-h-2 flex-1 rounded-t-sm ${color}`}
        />
      ))}
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`rounded-lg border border-white/70 bg-white/88 shadow-[0_24px_80px_rgba(26,26,26,0.08)] ring-1 ring-line/10 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <main className="pt-24 md:pt-32 pb-16 min-h-screen bg-[#F4F0E8]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(26,26,26,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.045)_1px,transparent_1px)] [background-size:72px_72px]" />
      <section className="px-4 sm:px-8 md:px-12 lg:px-24 pb-10">
        <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-12 items-end">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-bold text-accent shadow-sm ring-1 ring-line/10">
                Project Controls Dashboard
              </span>
              <span className="rounded-full bg-[#172120] px-4 py-2 text-[10px] uppercase tracking-[0.25em] font-bold text-white/70 shadow-sm">
                Live portfolio view
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display leading-[0.88] tracking-tight mb-8">
              Executive <span className="text-accent">analytics</span> control room.
            </h1>
            <p className="max-w-2xl text-muted leading-relaxed font-light">
              Advanced planning, cost, schedule, risk, and data-platform visuals for decision-ready reporting.
              Built as a portfolio dashboard layer for Primavera P6, Microsoft Fabric, SQL, Power BI, and AI automation work.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {commandStats.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white/70 p-4 ring-1 ring-line/10 backdrop-blur">
                  <div className="text-[9px] uppercase tracking-widest font-bold text-muted/50">{label}</div>
                  <div className="mt-2 text-sm font-bold text-ink/80">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <Panel className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line/10 bg-[#172120] px-5 py-4 text-white">
              <div>
                <div className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/40">Executive Stack</div>
                <div className="mt-1 text-lg font-display">KPI cockpit</div>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C06C54]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D9A441]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#267365]" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5 md:p-6">
              {executiveKpis.slice(0, 6).map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div key={kpi.label} className="rounded-lg border border-line/10 bg-[#F8F6F1] p-4 transition-colors hover:bg-white">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-muted/60">{kpi.label}</span>
                      <span className="rounded-md bg-white p-2 ring-1 ring-line/10">
                        <Icon className="w-4 h-4 text-accent shrink-0" />
                      </span>
                    </div>
                    <div className="mt-5 text-3xl font-display leading-none">{kpi.value}</div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold text-[#267365]">{kpi.trend}</span>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-muted/45 text-right">{kpi.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <div className="grid xl:grid-cols-2 gap-5 md:gap-6 items-stretch">
          <Panel className="h-full overflow-hidden p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Earned Value</div>
                <h2 className="text-3xl md:text-[2.35rem] font-display leading-tight">PV / EV / AC S-curve</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest font-bold text-muted/60">
                <span className="flex items-center gap-2 rounded-full bg-bg px-3 py-2"><span className="w-3 h-3 rounded-full bg-[#314E52]" /> PV baseline</span>
                <span className="flex items-center gap-2 rounded-full bg-bg px-3 py-2"><span className="w-3 h-3 rounded-full bg-[#267365]" /> EV earned</span>
                <span className="flex items-center gap-2 rounded-full bg-bg px-3 py-2"><span className="w-3 h-3 rounded-full bg-[#C06C54]" /> AC actual</span>
              </div>
            </div>

            <div className="rounded-lg bg-[#F8F6F1] p-4 ring-1 ring-line/10">
            <svg viewBox="0 0 560 260" className="w-full h-auto" role="img" aria-label="Earned value S-curve chart">
              {[52, 100, 148, 196, 244].map((y) => (
                <path key={y} d={`M28 ${y}H528`} stroke="rgba(26,26,26,0.08)" strokeWidth="1" />
              ))}
              {[92, 172, 252, 332, 412, 492].map((x) => (
                <path key={x} d={`M${x} 34V252`} stroke="rgba(26,26,26,0.05)" strokeWidth="1" />
              ))}
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1 }} d={sCurvePoints.pv} fill="none" stroke="#314E52" strokeWidth="5" strokeLinecap="round" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.15 }} d={sCurvePoints.ev} fill="none" stroke="#267365" strokeWidth="5" strokeLinecap="round" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 }} d={sCurvePoints.ac} fill="none" stroke="#C06C54" strokeWidth="5" strokeLinecap="round" />
              <path d={`${sCurvePoints.ev} L520 252 L28 252Z`} fill="rgba(38,115,101,0.08)" />
              <text x="30" y="252" className="fill-muted text-[10px] uppercase tracking-widest">Jan</text>
              <text x="250" y="252" className="fill-muted text-[10px] uppercase tracking-widest">Jun</text>
              <text x="500" y="252" className="fill-muted text-[10px] uppercase tracking-widest">Dec</text>
            </svg>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
              <div className="rounded-lg bg-[#F8F6F1] p-4 ring-1 ring-line/10">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent">
                      Earned Value Pulse
                    </div>
                    <div className="mt-1 text-xs text-muted/70">
                      Cumulative value position against approved baseline
                    </div>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/60 ring-1 ring-line/10">
                    Period 08
                  </div>
                </div>
                <div className="space-y-4">
                  {earnedValuePulse.map((item) => (
                    <div key={item.label} className="grid grid-cols-[44px_1fr_72px] items-center gap-3">
                      <div className="text-xs font-bold uppercase tracking-widest text-muted">{item.label}</div>
                      <div className="h-3 rounded-full bg-white ring-1 ring-line/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.75 }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                      <div className="text-right text-xs font-bold text-ink/70">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[#172120] p-4 text-white ring-1 ring-line/10">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#F0C76A]">SPI</div>
                  <div className="mt-3 text-3xl font-display">0.96</div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest font-bold text-white/60">schedule index</div>
                </div>
                <div className="rounded-lg bg-white p-4 ring-1 ring-line/10">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-accent">CPI</div>
                  <div className="mt-3 text-3xl font-display">1.08</div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest font-bold text-muted/50">cost index</div>
                </div>
                <div className="col-span-2 rounded-lg bg-white p-4 ring-1 ring-line/10">
                  <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-muted/55">
                    <span>Baseline checkpoint trail</span>
                    <span>5 gates</span>
                  </div>
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 bg-line" />
                    {["B0", "B1", "B2", "B3", "FC"].map((gate, index) => (
                      <div
                        key={gate}
                        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold ${
                          index < 3 ? "bg-[#267365] text-white" : index === 3 ? "bg-[#D9A441] text-ink" : "bg-bg text-muted ring-1 ring-line"
                        }`}
                      >
                        {gate}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-white p-4 ring-1 ring-line/10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent">
                    Value Reconciliation Waterfall
                  </div>
                  <div className="mt-1 text-xs text-muted/70">
                    Baseline, earned value, actual cost, and latest forecast position
                  </div>
                </div>
                <div className="rounded-full bg-bg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted ring-1 ring-line/10">
                  Delta view
                </div>
              </div>

              <div className="space-y-3">
                {reconciliation.map((item, index) => (
                  <div key={item.label} className="grid grid-cols-[92px_1fr_70px] items-center gap-3">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-muted/60">{item.label}</div>
                    <div className="h-8 rounded-md bg-bg p-1 ring-1 ring-line/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.06 }}
                        className={`h-full rounded ${item.color}`}
                      />
                    </div>
                    <div className="text-right text-xs font-bold text-ink/70">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel className="h-full overflow-hidden border-[#314E52] bg-[#0B1211] p-5 text-white md:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#F0C76A] mb-2">Variance Engine</div>
                <h2 className="text-3xl font-display text-white">Forecast status</h2>
              </div>
              <Activity className="w-5 h-5 text-[#D9A441]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-2 gap-3 mb-5">
              {[
                ["SV", "-$184K"],
                ["CV", "+$236K"],
                ["VAC", "+$411K"],
                ["TCPI", "0.91"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-[#3F5550] bg-[#172120] p-4 shadow-inner">
                  <div className="text-[12px] uppercase tracking-widest font-bold text-[#F0C76A]">{label}</div>
                  <div className="text-2xl 2xl:text-3xl font-display mt-3 text-white">{value}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-[#3F5550] bg-[#172120] p-4 shadow-inner">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#F0C76A]">
                      Delivery Readiness Index
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-white">
                      Forecast variance, workstream maturity, and risk pressure in one control view.
                    </div>
                  </div>
                <div className="rounded-full bg-[#F0C76A] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0B1211]">
                  81.8 avg
                </div>
              </div>

              <div className="grid gap-4 min-[1400px]:grid-cols-[0.74fr_1.26fr]">
                <div className="rounded-lg bg-[#0B1211] p-4 ring-1 ring-[#3F5550]">
                  <div className="relative mx-auto h-36 w-36 min-[1400px]:h-40 min-[1400px]:w-40">
                    <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" role="img" aria-label="Delivery readiness radial gauge">
                      <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
                      <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(192,108,84,0.55)" strokeWidth="16" strokeDasharray="70 389" />
                      <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(217,164,65,0.85)" strokeWidth="16" strokeDasharray="96 389" strokeDashoffset="-70" />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="62"
                        fill="none"
                        stroke="#267365"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray="153 389"
                        strokeDashoffset="-166"
                        initial={{ strokeDasharray: "0 389" }}
                        whileInView={{ strokeDasharray: "153 389" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-4xl font-display leading-none text-white">82</div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F0C76A]">readiness</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {["At risk", "Watch", "Ready"].map((label, index) => (
                      <div key={label} className="rounded-md bg-[#172120] px-2 py-2 ring-1 ring-[#3F5550]">
                        <div className={`mx-auto mb-1 h-2 w-2 rounded-full ${index === 0 ? "bg-[#C06C54]" : index === 1 ? "bg-[#D9A441]" : "bg-[#267365]"}`} />
                        <div className="text-[8px] uppercase tracking-widest text-white">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {varianceBands.map((band) => (
                      <div key={band.label} className="rounded-lg bg-[#0B1211] p-3 ring-1 ring-[#3F5550]">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-white">{band.label}</span>
                          <span className="text-[10px] font-bold" style={{ color: band.color }}>{band.delta}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${band.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: band.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-[#0B1211] p-4 ring-1 ring-[#3F5550]">
                    <div className="mb-4 grid grid-cols-[1fr_44px_44px] gap-3 text-[9px] uppercase tracking-widest font-bold text-[#F0C76A]">
                      <span>Workstream bullet analysis</span>
                      <span className="text-right">Now</span>
                      <span className="text-right">Goal</span>
                    </div>
                    <div className="space-y-4">
                      {workstreams.map((item, index) => (
                        <div key={item.label} className="grid grid-cols-[1fr_44px_44px] gap-3 items-center">
                          <div>
                            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-white">
                              <span>{item.label}</span>
                            </div>
                            <div className="relative h-3 rounded-full bg-white/10">
                              <div className="absolute left-[85%] top-1/2 h-5 w-px -translate-y-1/2 bg-white/70" />
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.75, delay: index * 0.06 }}
                                className={`h-full rounded-full ${item.color}`}
                              />
                            </div>
                          </div>
                          <div className="text-right text-xs font-bold text-white">{item.value}%</div>
                          <div className="text-right text-xs font-bold text-[#F0C76A]">85%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <Panel className="p-5 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Live Power BI Embed</div>
              <h2 className="text-3xl md:text-5xl font-display leading-tight">EPC EVM Dashboard <span className="text-accent">— live demo</span></h2>
              <p className="mt-3 max-w-2xl text-muted text-sm leading-relaxed font-light">
                A live, interactive Power BI dashboard for a simulated AED 6 billion EPC expansion. Full Earned Value
                Management suite (PV, EV, AC, SPI, CPI, EAC, ETC, VAC, TCPI), an executive S-curve, discipline-wise progress,
                resource histogram, and forecast scenarios. Built on a tabular star schema with 28 DAX measures, Deneb (Vega-Lite)
                visuals and a custom glassmorphism theme.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Power BI", "DAX", "Deneb", "Primavera P6", "EVM"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-accent ring-1 ring-line/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-lg ring-1 ring-line/10 bg-[#172120]" style={{ paddingTop: "62.5%" }}>
            <iframe
              title="EPC_EVM_Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiZjFjZTBmN2MtN2Y1OC00MGU3LTg1NDYtZDYxZDhhM2NhMTk0IiwidCI6ImYwNmE0NTJkLTMzZDAtNDYxYi1hZWFkLWE2NDI5NjI0OTY4NyIsImMiOjEwfQ%3D%3D"
              frameBorder={0}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] uppercase tracking-widest font-bold text-muted/60">
            <span>BAC: AED 6.00 B</span>
            <span>SPI: 0.975</span>
            <span>CPI: 0.995</span>
            <span>EAC: AED 6.03 B</span>
          </div>
        </Panel>
      </section>

      <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <Panel className="p-5 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Live Power BI Embed</div>
              <h2 className="text-3xl md:text-5xl font-display leading-tight">EPC Cash Flow & Cost Dashboard <span className="text-accent">— live demo</span></h2>
              <p className="mt-3 max-w-2xl text-muted text-sm leading-relaxed font-light">
                A live contractor cash-flow and cost-control dashboard for the same AED 6 billion EPC programme. Tracks budget
                utilisation, committed vs actual cost, monthly cash flow, an S-curve of cumulative spend, retention, net cash
                position, invoice ageing and collection rate — with cost-breakdown and forecast-at-completion by category.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Power BI", "DAX", "Cost Control", "Cash Flow", "Invoicing"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-accent ring-1 ring-line/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-lg ring-1 ring-line/10 bg-[#172120]" style={{ paddingTop: "62.5%" }}>
            <iframe
              title="EPC_CashFlow_Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiNjVkMDg2ODItNzUyYS00YzMwLThlMzUtZjYwN2M5MWYyODQ4IiwidCI6ImYwNmE0NTJkLTMzZDAtNDYxYi1hZWFkLWE2NDI5NjI0OTY4NyIsImMiOjEwfQ%3D%3D"
              frameBorder={0}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] uppercase tracking-widest font-bold text-muted/60">
            <span>Committed: 93%</span>
            <span>Cost Var: −AED 164 M</span>
            <span>Net Position: −AED 579 M</span>
            <span>Collection: 47.4%</span>
          </div>
        </Panel>
      </section>

      <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          <Panel className="p-5 md:p-7 lg:col-span-2">
            <div className="flex items-center justify-between mb-7">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">WBS Control</div>
                <h2 className="text-3xl font-display">Planned vs actual progress</h2>
              </div>
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-5">
              {wbsProgress.map((row) => (
                <div key={row.label} className="grid md:grid-cols-[150px_1fr_48px] gap-3 md:gap-5 items-center">
                  <div className="text-xs uppercase tracking-widest font-bold text-muted">{row.label}</div>
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-bg"><div className="h-full rounded-full bg-[#314E52]" style={{ width: `${row.plan}%` }} /></div>
                    <div className="h-3 rounded-full bg-bg"><div className="h-full rounded-full bg-[#D9A441]" style={{ width: `${row.actual}%` }} /></div>
                  </div>
                  <div className="text-right text-xs font-bold text-ink/70">{row.actual}%</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5 md:p-7">
            <div className="flex items-center justify-between mb-7">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Risk Matrix</div>
                <h2 className="text-3xl font-display">Probability x impact</h2>
              </div>
              <AlertTriangle className="w-5 h-5 text-[#C06C54]" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {riskMatrix.flat().map((risk, index) => (
                <div
                  key={`${risk}-${index}`}
                  className={`aspect-square rounded-sm border border-white/40 shadow-inner ${
                    risk === "low" ? "bg-[#C9D8C5]" : risk === "medium" ? "bg-[#D9C27A]" : risk === "high" ? "bg-[#C06C54]" : "bg-[#7A2E2E]"
                  }`}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-widest font-bold text-muted/60">
              <span>Open risks: 27</span>
              <span>Critical: 4</span>
              <span>Mitigated: 13</span>
              <span>Owner aging: 6d</span>
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <div className="grid lg:grid-cols-4 gap-5 md:gap-6">
          <Panel className="p-5 md:p-7 lg:col-span-2">
            <div className="flex items-center justify-between mb-7">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Cash Flow</div>
                <h2 className="text-3xl font-display">Monthly burn pattern</h2>
              </div>
              <LineChart className="w-5 h-5 text-accent" />
            </div>
            <SparkBars values={cashflow} color="bg-[#267365]" />
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-bg p-4 ring-1 ring-line/10"><div className="text-[10px] uppercase tracking-widest font-bold text-muted/50">Peak month</div><div className="text-2xl font-display mt-2">$136K</div></div>
              <div className="rounded-lg bg-bg p-4 ring-1 ring-line/10"><div className="text-[10px] uppercase tracking-widest font-bold text-muted/50">Avg burn</div><div className="text-2xl font-display mt-2">$92K</div></div>
              <div className="rounded-lg bg-bg p-4 ring-1 ring-line/10"><div className="text-[10px] uppercase tracking-widest font-bold text-muted/50">Runway</div><div className="text-2xl font-display mt-2">11.8 mo</div></div>
            </div>
          </Panel>

          <Panel className="p-5 md:p-7 lg:col-span-2">
            <div className="flex items-center justify-between mb-7">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Resource Load</div>
                <h2 className="text-3xl font-display">Crew utilization</h2>
              </div>
              <Network className="w-5 h-5 text-accent" />
            </div>
            <SparkBars values={resourceLoad} color="bg-[#314E52]" />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Civil", "MEP", "Planning", "Data"].map((team, index) => (
                <div key={team} className="rounded-lg border border-line/10 bg-bg/70 p-4">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted/50">{team}</div>
                  <div className="text-2xl font-display mt-2">{[84, 76, 91, 88][index]}%</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <Panel className="p-5 md:p-8">
          <div className="grid xl:grid-cols-[0.75fr_1.25fr] gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-2">Milestone Intelligence</div>
              <h2 className="text-3xl md:text-5xl font-display leading-tight mb-5">Look-ahead schedule board.</h2>
              <p className="text-muted text-sm leading-relaxed">
                A compact control view for upcoming deliverables, blocked handoffs, approval dependencies, and AI-generated watchlist signals.
              </p>
            </div>
            <div className="grid md:grid-cols-5 gap-3">
              {milestones.map((item) => (
                <div key={item.label} className="min-h-36 rounded-lg border border-line/10 bg-bg p-4 flex flex-col justify-between transition-transform hover:-translate-y-1">
                  <CalendarClock className={`w-5 h-5 ${item.state === "risk" ? "text-[#C06C54]" : item.state === "watch" ? "text-[#D9A441]" : item.state === "active" ? "text-[#314E52]" : "text-[#267365]"}`} />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-muted/50 mb-2">{item.date}</div>
                    <div className="text-sm font-bold leading-tight">{item.label}</div>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-muted/60">
                    {item.state === "done" ? <CheckCircle2 className="w-3 h-3 text-[#267365]" /> : <GitBranch className="w-3 h-3 text-accent" />}
                    {item.state}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>
    </main>
  );
}
