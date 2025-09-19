import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} from "@/services/news";
import { News, NewsFormData, NewsUpdateFormData } from "@/types/news";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useNewsQuery() {
  return useQuery<News[], Error>({
    queryKey: ["news"],
    queryFn: getAllNews,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export function useNewsMutation() {
  return useMutation({
    mutationFn: (data: FormData) => createNews(data),
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

export function useNewsUpdateMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: NewsUpdateFormData }) =>
      updateNews(id, data),
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

export function useNewsDeleteMutation() {
  return useMutation({
    mutationFn: (id: number) => deleteNews(id),
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
