import { getReports } from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export function useReportsQuery() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000,
  });
}
