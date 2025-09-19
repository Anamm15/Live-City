import {
  getSubmissionById,
  getSubmissions,
  updateSubmission,
  updateSubmissionStatus,
} from "@/services/submission";
import { Submission } from "@/types/submission";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSubmissionQuery() {
  return useQuery<Submission[], Error>({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export function useDetailSubmissionQuery(id: number) {
  return useQuery<Submission, Error>({
    queryKey: ["submissions", id],
    queryFn: () => getSubmissionById(id),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export function useSubmissionUpdateMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateSubmission(id, data),
    onMutate: () => {
      const toastId = toast.loading("Submitting...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Update successful!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Update failed: " + (error as Error).message);
    },
  });
}

export function useSubmissionStatusUpdateMutation() {
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateSubmissionStatus(id, status),
    onMutate: () => {
      const toastId = toast.loading("Submitting...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Update successful!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Update failed");
    },
  });
}
