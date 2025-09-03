import { getMe } from "@/services/user";
import { UserResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useGetMeQuery() {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
}
