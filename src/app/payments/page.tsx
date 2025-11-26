"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";

// Mock data - replace with API call
const mockPayments = [
  {
    id: "PAY-001",
    amount: 1500000,
    currency: "VND",
    status: "completed" as const,
    method: "Thẻ tín dụng",
    description: "Gói Brand Owner - Tháng 11/2024",
    date: new Date("2024-11-01T10:30:00"),
    invoiceNumber: "INV-2024-001",
  },
  {
    id: "PAY-002",
    amount: 1500000,
    currency: "VND",
    status: "completed" as const,
    method: "Chuyển khoản",
    description: "Gói Brand Owner - Tháng 10/2024",
    date: new Date("2024-10-01T14:20:00"),
    invoiceNumber: "INV-2024-002",
  },
  {
    id: "PAY-003",
    amount: 1500000,
    currency: "VND",
    status: "pending" as const,
    method: "Thẻ tín dụng",
    description: "Gói Brand Owner - Tháng 12/2024",
    date: new Date("2024-12-01T09:15:00"),
    invoiceNumber: "INV-2024-003",
  },
  {
    id: "PAY-004",
    amount: 14400000,
    currency: "VND",
    status: "completed" as const,
    method: "Chuyển khoản",
    description: "Gói Brand Owner - Năm 2024 (Giảm 20%)",
    date: new Date("2024-01-15T11:45:00"),
    invoiceNumber: "INV-2024-004",
  },
  {
    id: "PAY-005",
    amount: 1500000,
    currency: "VND",
    status: "failed" as const,
    method: "Thẻ tín dụng",
    description: "Gói Brand Owner - Tháng 09/2024",
    date: new Date("2024-09-01T16:30:00"),
    invoiceNumber: "INV-2024-005",
  },
];

export default function PaymentsPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all");

  const filteredPayments = mockPayments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  const totalPaid = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white">
              FS
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Frago</p>
              <p className="text-base font-bold text-slate-900">Quản lý thanh toán</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-700">
                Dashboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="border-slate-200">
                Hồ sơ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Lịch sử thanh toán</h1>
          <p className="mt-2 text-slate-600">
            Quản lý và theo dõi tất cả các giao dịch thanh toán của bạn
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Tổng đã thanh toán</CardDescription>
              <CardTitle className="text-3xl">
                {totalPaid.toLocaleString("vi-VN")}đ
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Số giao dịch</CardDescription>
              <CardTitle className="text-3xl">{mockPayments.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Giao dịch thành công</CardDescription>
              <CardTitle className="text-3xl">
                {mockPayments.filter((p) => p.status === "completed").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            Tất cả
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            size="sm"
          >
            Đã thanh toán
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            size="sm"
          >
            Chờ xử lý
          </Button>
          <Button
            variant={filter === "failed" ? "default" : "outline"}
            onClick={() => setFilter("failed")}
            size="sm"
          >
            Thất bại
          </Button>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách giao dịch</CardTitle>
            <CardDescription>
              Hiển thị {filteredPayments.length} giao dịch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã giao dịch</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Phương thức</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-slate-500">
                        Không có giao dịch nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">
                          {payment.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">
                              {payment.description}
                            </p>
                            <p className="text-xs text-slate-500">
                              {payment.invoiceNumber}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {format(payment.date, "dd/MM/yyyy", { locale: vi })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {payment.method}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900">
                          {payment.amount.toLocaleString("vi-VN")}đ
                        </TableCell>
                        <TableCell>
                          <PaymentStatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/payments/${payment.id}`}>
                            <Button variant="ghost" size="sm">
                              Chi tiết
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
