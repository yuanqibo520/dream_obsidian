import { useState } from "react";
import { Search } from "lucide-react";
import { PageContainer } from "../../components/layout/PageContainer";
import { Input } from "../../components/common/Input";
import { PostList } from "../../components/feature/posts/PostList";
import { useDebounce } from "../../hooks/useDebounce";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";

export function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const { data, isLoading, isError } = useInfinitePosts(undefined, debouncedKeyword);

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="text-3xl font-extrabold text-ink">搜索</h1>
        <p className="mt-2 text-sm text-muted">按关键词搜索帖子和板块。</p>
        <div className="relative mt-4 max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input className="pl-10" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="例如：键盘、音乐节、高数、钥匙" autoFocus />
        </div>
      </div>
      <PostList posts={data?.items} isLoading={isLoading} isError={isError} />
    </PageContainer>
  );
}
