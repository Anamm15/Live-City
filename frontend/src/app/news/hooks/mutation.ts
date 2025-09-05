import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewsComment,
  getAllNews,
  getNewsComments,
} from "@/services/news";
import { News } from "@/types/news";
import toast from "react-hot-toast";

export function useNewsQuery() {
  return useQuery<News[], Error>({
    queryKey: ["news"],
    queryFn: getAllNews,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useNewsCommentsMutation() {
  return useMutation({
    mutationFn: (newsId: number) => getNewsComments(newsId),
  });
}

export function useAddNewsCommentMutation() {
  return useMutation({
    mutationFn: ({ newsId, content }: { newsId: number; content: string }) =>
      createNewsComment(newsId, content),
    onMutate: () => {
      const toastId = toast.loading("Adding comment...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.success("Comment added successfully!");
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error("Failed to add comment: " + (error as Error).message);
    },
  });
}
