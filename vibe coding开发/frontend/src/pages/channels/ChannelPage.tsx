import { PageContainer } from "../../components/layout/PageContainer";
import { ChannelTabs } from "../../components/feature/channels/ChannelTabs";
import { PostList } from "../../components/feature/posts/PostList";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";

type ChannelPageProps = {
  channelId: string;
  title: string;
  description: string;
};

export function ChannelPage({ channelId, title, description }: ChannelPageProps) {
  const { data, isLoading, isError } = useInfinitePosts(channelId);

  return (
    <PageContainer>
      <div className="glass-panel mb-5 overflow-hidden rounded-[28px] p-6">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Channel</p>
          <h1 className="text-4xl font-black text-ink">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>
        </div>
        <div className="mt-4">
          <ChannelTabs active={channelId} />
        </div>
      </div>
      <PostList posts={data?.items} isLoading={isLoading} isError={isError} />
    </PageContainer>
  );
}
