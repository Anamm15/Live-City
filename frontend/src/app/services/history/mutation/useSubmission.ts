import { getSubmissions } from "@/services/submission";
import { Submission } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";

export function useSubmissionQuery() {
  return useQuery<Submission[]>({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000,
  });
}
