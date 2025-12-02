import { format } from "date-fns";
import { vi } from "date-fns/locale";
interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
    type: "success" | "info" | "warning" | "error";
    }
    interface PaymentTimelineProps {
        events: TimelineEvent[];
    }
const typeConfig = {
    success: {
        dotColor: "bg-emerald-500",
        lineColor: "bg-emerald-200",
    },
    info: {
        dotColor: "bg-blue-500",
        lineColor: "bg-blue-200",
    },
    warning: {
        dotColor: "bg-amber-500",
        lineColor: "bg-amber-200",
    },
    error: {
        dotColor: "bg-red-500",
        lineColor: "bg-red-200",
    },
};
export function PaymentTimeline({ events }: PaymentTimelineProps) {
    return (
    <div className="space-y-6">
        {events.map((event, index) => {
            const config = typeConfig[event.type];
    const isLast = index === events.length - 1;
    return (
        <div key={event.id} className="relative flex gap-4">
            {/* Timeline line */}
            {!isLast && (
                <div className={`absolute left-2 top-8 h-full w-0.5 ${config.lineColor}`} 
                />
            )}
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
             <div
             className={`h-4 w-4 rounded-full ${config.dotColor} ring-4 ring-white`}
            />
            </div>{/* Content */}
            <div className="flex-1 pb-6">
                <div className="flex items-start justify-between gap-4">
                 <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{event.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{event.description}</p>
                    </div>
                     <time className="text-xs text-slate-500">
                    {format(event.timestamp, "dd MMM yyyy, HH:mm", { locale: vi })}
                     </time>
                 </div>
            </div>
        </div>
        );
        })}
    </div>
    );
}