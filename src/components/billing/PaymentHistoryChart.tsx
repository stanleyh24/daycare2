import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PaymentData {
  month: string;
  revenue: number;
  expenses: number;
}

interface PaymentHistoryChartProps {
  data?: PaymentData[];
}

const PaymentHistoryChart = ({
  data: initialData,
}: PaymentHistoryChartProps) => {
  // Mock data for payment history
  const defaultData: PaymentData[] = [
    {
      month: "Jan",
      revenue: 18500,
      expenses: 12000,
    },
    {
      month: "Feb",
      revenue: 19200,
      expenses: 12500,
    },
    {
      month: "Mar",
      revenue: 21000,
      expenses: 13000,
    },
    {
      month: "Apr",
      revenue: 22500,
      expenses: 13500,
    },
    {
      month: "May",
      revenue: 23800,
      expenses: 14000,
    },
    {
      month: "Jun",
      revenue: 24850,
      expenses: 14500,
    },
  ];

  const data = initialData || defaultData;

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Monthly revenue and expenses for the current year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistoryChart;
