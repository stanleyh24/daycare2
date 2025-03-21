import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  FileText,
  CreditCard,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface BillingOverviewProps {
  totalRevenue?: number;
  pendingPayments?: number;
  overduePayments?: number;
  paidInvoices?: number;
}

const BillingOverview = ({
  totalRevenue = 24850,
  pendingPayments = 3200,
  overduePayments = 1500,
  paidInvoices = 42,
}: BillingOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Current month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Payments
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${pendingPayments.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            >
              {Math.round((pendingPayments / totalRevenue) * 100)}% of revenue
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Overdue Payments
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${overduePayments.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 hover:bg-red-100"
            >
              {Math.round((overduePayments / totalRevenue) * 100)}% of revenue
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paidInvoices}</div>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 hover:bg-green-100"
            >
              This month
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingOverview;
