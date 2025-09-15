import { deleteVotePoll, getPolls, votes } from "@/services/poll";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetPollsQuery() {
  return useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000,
  });
}

export function useVotePollMutation() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { pollOptionId: number };
    }) => votes(id, data),
    onMutate: () => {
      const toastId = toast.loading("Voting...");
      return toastId;
    },
    onSuccess: (_data, _variables, context) => {
      if (context) toast.dismiss(context);
      toast.success("Voted successfully!");
    },
    onError: (error, _variables, context) => {
      if (context) toast.dismiss(context);
      toast.error("Vote failed");
    },
  });
}

export function useDeleteVotePollMutation() {
  return useMutation({
    mutationFn: (pollId: number) => deleteVotePoll(pollId),
    onMutate: () => {
      const toastId = toast.loading("Clearing...");
      return toastId;
    },
    onSuccess: (_data, _variables, context) => {
      if (context) toast.dismiss(context);
      toast.success("Vote cleared successfully!");
    },
    onError: (error, _variables, context) => {
      if (context) toast.dismiss(context);
      toast.error("Clear vote failed");
    },
  });
}
