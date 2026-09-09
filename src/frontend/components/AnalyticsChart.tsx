"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface AnalyticsChartProps {
  data: Array<{ date: string; clicks: number; leads: number }>;
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#17181C" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#17181C" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E6E2" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#17181C",
              borderColor: "#17181C",
              borderRadius: "12px",
              color: "#FFF",
              fontSize: "12px"
            }}
            itemStyle={{ color: "#FFF" }}
          />
          <Area type="monotone" dataKey="clicks" name="Clicks" stroke="#17181C" strokeWidth={3} fillOpacity={1} fill="url(#clicksGrad)" />
          <Area type="monotone" dataKey="leads" name="Leads" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#leadsGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
