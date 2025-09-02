import { useMutation } from "@tanstack/react-query";
import { createReport } from "@/services/report";
import toast from "react-hot-toast";

export function useReportMutation() {
  return useMutation({
    mutationFn: (data: FormData) => createReport(data),
    onMutate: () => {
      const toastId = toast.loading("Submitting report...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Report submitted successfully!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Failed to submit report: " + (error as Error).message);
    },
  });
}
