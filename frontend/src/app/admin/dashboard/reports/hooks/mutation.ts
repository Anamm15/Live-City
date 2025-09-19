import {
  getReportById,
  getReports,
  updateReport,
  updateReportResponse,
} from "@/services/report";
import { Report, ReportResponseUpdateData } from "@/types/report";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useReportQuery() {
  return useQuery<Report[], Error>({
    queryKey: ["reports"],
    queryFn: getReports,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export function useDetailReportQuery(id: number) {
  return useQuery<Report, Error>({
    queryKey: ["reports", id],
    queryFn: () => getReportById(id),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export function useReportUpdateMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateReport(id, data),
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

export function useReportResponseUpdateMutation() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: ReportResponseUpdateData;
    }) => updateReportResponse(id, data),
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
