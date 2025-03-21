import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "credit" | "bank";
  name: string;
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface PaymentMethodsPanelProps {
  paymentMethods?: PaymentMethod[];
}

const PaymentMethodsPanel = ({
  paymentMethods: initialPaymentMethods,
}: PaymentMethodsPanelProps) => {
  // Mock data for payment methods
  const defaultPaymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "credit",
      name: "Visa ending in 4242",
      last4: "4242",
      expiryDate: "04/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "bank",
      name: "Chase Bank Account",
      last4: "9876",
      isDefault: false,
    },
  ];

  const paymentMethods = initialPaymentMethods || defaultPaymentMethods;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage payment methods for parents to pay invoices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center justify-between rounded-lg border p-4 ${method.isDefault ? "border-primary bg-primary/5" : ""}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-muted-foreground">
                  {method.type === "credit" && method.expiryDate
                    ? `Expires ${method.expiryDate}`
                    : "Bank Account"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {method.isDefault ? (
                <span className="text-xs font-medium text-primary">
                  Default
                </span>
              ) : (
                <Button variant="outline" size="sm">
                  Set as Default
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodsPanel;
