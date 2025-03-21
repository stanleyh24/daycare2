import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Invoice {
  id: string;
  invoiceNumber: string;
  childName: string;
  parentName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  issuedDate: string;
}

interface InvoicesListProps {
  invoices?: Invoice[];
}

const InvoicesList = ({ invoices: initialInvoices }: InvoicesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data for invoices
  const defaultInvoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2023-001",
      childName: "Emma Thompson",
      parentName: "Sarah Thompson",
      amount: 450,
      status: "paid",
      dueDate: "2023-05-15",
      issuedDate: "2023-05-01",
    },
    {
      id: "2",
      invoiceNumber: "INV-2023-002",
      childName: "Noah Martinez",
      parentName: "Maria Martinez",
      amount: 450,
      status: "paid",
      dueDate: "2023-05-15",
      issuedDate: "2023-05-01",
    },
    {
      id: "3",
      invoiceNumber: "INV-2023-003",
      childName: "Olivia Johnson",
      parentName: "Michael Johnson",
      amount: 525,
      status: "pending",
      dueDate: "2023-06-15",
      issuedDate: "2023-06-01",
    },
    {
      id: "4",
      invoiceNumber: "INV-2023-004",
      childName: "Liam Wilson",
      parentName: "Jennifer Wilson",
      amount: 525,
      status: "pending",
      dueDate: "2023-06-15",
      issuedDate: "2023-06-01",
    },
    {
      id: "5",
      invoiceNumber: "INV-2023-005",
      childName: "Ava Brown",
      parentName: "Robert Brown",
      amount: 375,
      status: "overdue",
      dueDate: "2023-04-15",
      issuedDate: "2023-04-01",
    },
    {
      id: "6",
      invoiceNumber: "INV-2023-006",
      childName: "Sophia Davis",
      parentName: "Emily Davis",
      amount: 450,
      status: "paid",
      dueDate: "2023-05-15",
      issuedDate: "2023-05-01",
    },
    {
      id: "7",
      invoiceNumber: "INV-2023-007",
      childName: "Jackson Miller",
      parentName: "David Miller",
      amount: 525,
      status: "pending",
      dueDate: "2023-06-15",
      issuedDate: "2023-06-01",
    },
    {
      id: "8",
      invoiceNumber: "INV-2023-008",
      childName: "Isabella Garcia",
      parentName: "Carlos Garcia",
      amount: 375,
      status: "overdue",
      dueDate: "2023-04-15",
      issuedDate: "2023-04-01",
    },
  ];

  const invoices = initialInvoices || defaultInvoices;

  // Filter invoices based on search query and status filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Generate New Invoice</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Child</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice.childName}</TableCell>
                  <TableCell>{invoice.parentName}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>{formatDate(invoice.issuedDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicesList;
