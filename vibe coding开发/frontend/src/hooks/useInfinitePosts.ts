import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/post.service";
import type { SortMode } from "../types/api";

export function useInfinitePosts(channelId?: string, keyword?: string, sort: SortMode = "hot") {
  return useQuery({
    queryKey: ["posts", channelId, keyword, sort],
    queryFn: () => getPosts({ channelId, keyword, sort }),
  });
}
