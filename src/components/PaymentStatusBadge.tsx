import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

type PaymentStatus = "completed" | "pending" | "failed" | "refunded" | "processing";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  completed: {
	label: "Đã thanh toán",
	className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
	label: "Chờ xử lý",
	className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  failed: {
	label: "Thất bại",
	className: "bg-red-50 text-red-700 border-red-200",
  },
  refunded: {
	label: "Đã hoàn tiền",
	className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  processing: {
	label: "Đang xử lý",
	className: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  return (
	<Badge className={cn(config.className, className)} variant="outline">
	  {config.label}
	</Badge>
  );
}