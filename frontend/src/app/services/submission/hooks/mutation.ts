import { useMutation } from "@tanstack/react-query";
import { createSubmission } from "@/services/submission";

export function useSubmissionMutation() {
   return useMutation({
      mutationFn: (data: FormData) => createSubmission(data),
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
