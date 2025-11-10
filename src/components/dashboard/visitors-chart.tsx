"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", visitors: 4000 },
  { month: "Feb", visitors: 3000 },
  { month: "Mar", visitors: 5000 },
  { month: "Apr", visitors: 4500 },
  { month: "May", visitors: 6000 },
  { month: "Jun", visitors: 5500 },
];

export function VisitorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors for the last 6 months</CardTitle>
        <CardDescription>Total for the last 3 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

