import { useNotificationStore } from "@/stores/notification";

export const useNotification = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  return {
    showSuccess: (title: string, message?: string) =>
      addNotification("success", title, message),
    showError: (title: string, message?: string) =>
      addNotification("error", title, message),
    showInfo: (title: string, message?: string) =>
      addNotification("info", title, message),
    showWarning: (title: string, message?: string) =>
      addNotification("warning", title, message),
  };
};
