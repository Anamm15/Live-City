import { createPoll, deletePoll, getPolls, updatePoll } from "@/services/poll";
import { Poll, PollCreateFormData, PollUpdateFormData } from "@/types/polls";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePollQuery() {
  return useQuery<Poll[], Error>({
    queryKey: ["polls"],
    queryFn: getPolls,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export function usePollAddMutation() {
  return useMutation({
    mutationFn: (data: PollCreateFormData) => createPoll(data),
    mutationKey: ["polls"],
    onMutate: () => {
      const toastId = toast.loading("Submitting...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Upload successful!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Upload failed: " + (error as Error).message);
    },
  });
}

export function usePollUpdateMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PollUpdateFormData }) =>
      updatePoll(id, data),
    mutationKey: ["polls"],
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

export function usePollDeleteMutation() {
  return useMutation({
    mutationFn: (id: number) => deletePoll(id),
    mutationKey: ["polls"],
    onMutate: () => {
      const toastId = toast.loading("Submitting...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Delete successful!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Delete failed: " + (error as Error).message);
    },
  });
}
