import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNotificationStore } from "@/stores/notification";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const notificationIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const notificationStyles = {
  success:
    "border-green-500 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200",
  error:
    "border-red-500 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200",
  warning:
    "border-yellow-500 bg-yellow-50 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200",
};

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {notifications.map((notification) => {
        const Icon = notificationIcons[notification.type];
        return (
          <Alert
            key={notification.id}
            className={cn(
              "relative pr-12 animate-in slide-in-from-top-2 fade-in duration-300",
              notificationStyles[notification.type]
            )}
          >
            <Icon className="h-4 w-4" />
            <AlertTitle>{notification.title}</AlertTitle>
            {notification.message && (
              <AlertDescription>{notification.message}</AlertDescription>
            )}
            <button
              onClick={() => removeNotification(notification.id)}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-black/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        );
      })}
    </div>
  );
}
