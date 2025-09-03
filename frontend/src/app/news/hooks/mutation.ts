import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/services/news";
import { News } from "@/types/news";

export function useNewsQuery() {
  return useQuery<News[], Error>({
    queryKey: ["news"],
    queryFn: getAllNews,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
