import { useState } from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import { EmptyState } from "../../components/common/EmptyState";
import { PostList } from "../../components/feature/posts/PostList";
import { ProfileHeader } from "../../components/feature/profile/ProfileHeader";
import { ProfileTabs } from "../../components/feature/profile/ProfileTabs";
import { currentUser, posts } from "../../services/mockData";

type ProfileTab = "posts" | "comments" | "favorites";

export function ProfilePage() {
  const [tab, setTab] = useState<ProfileTab>("posts");
  const ownedPosts = posts.filter((post) => post.authorName === "袁同学");
  const favoritePosts = posts.filter((post) => post.isFavorited);

  return (
    <PageContainer>
      <div className="space-y-5">
        <ProfileHeader user={currentUser} />
        <ProfileTabs value={tab} onChange={setTab} />
        {tab === "posts" && <PostList posts={ownedPosts} />}
        {tab === "favorites" && <PostList posts={favoritePosts} />}
        {tab === "comments" && <EmptyState title="评论记录预留" description="后续接入 comments 接口后展示我的评论。" />}
      </div>
    </PageContainer>
  );
}
