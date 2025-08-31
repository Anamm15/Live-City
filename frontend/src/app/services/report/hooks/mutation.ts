import { useMutation } from "@tanstack/react-query";
import { createReport } from "@/services/report";

export function useReportMutation() {
   return useMutation({
      mutationFn: (data: FormData) => createReport(data),
      onSuccess: (data) => {
      console.log("Submission success:", data);
      // contoh: tampilkan toast
      },
      onError: (error) => {
      console.error("Submission failed:", error);
      // contoh: tampilkan toast error
      },
   });
}
