import { useMutation } from "@tanstack/react-query";
import { createSubmission } from "@/services/submission";
import toast from "react-hot-toast";

export function useSubmissionMutation() {
  return useMutation({
    mutationFn: (data: FormData) => createSubmission(data),
    onMutate: () => {
      const toastId = toast.loading("Submitting...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Submission successful!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Submission failed: " + (error as Error).message);
    },
  });
}
