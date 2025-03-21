import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import BillingOverview from "@/components/billing/BillingOverview";
import InvoicesList from "@/components/billing/InvoicesList";
import PaymentMethodsPanel from "@/components/billing/PaymentMethodsPanel";
import PaymentHistoryChart from "@/components/billing/PaymentHistoryChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, CreditCard, BarChart3 } from "lucide-react";

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <MainLayout title="Billing & Payments">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Billing & Payments
            </h2>
            <p className="text-muted-foreground">
              Manage invoices, payments, and financial reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
          </div>
        </div>

        <BillingOverview />

        <Tabs
          defaultValue="invoices"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="invoices" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="payment-methods" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="financial-reports"
              className="flex items-center"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Financial Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <InvoicesList />
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <PaymentMethodsPanel />
              </div>
              <div>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Payment Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Payment Reminders</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure automatic payment reminders for parents
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Configure
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Late Payment Fees</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up late payment fees and grace periods
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Configure
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Payment Processors
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Manage payment processor integrations
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial-reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <PaymentHistoryChart />
              <div>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">
                    Financial Reports
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Revenue Report</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed breakdown of all revenue sources
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Generate Report
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Expense Report</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed breakdown of all expenses
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Generate Report
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Tax Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        Summary of tax-related financial information
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Generate Report
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Annual Statement</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete annual financial statement
                      </p>
                      <Button variant="link" className="px-0 text-sm">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BillingPage;
