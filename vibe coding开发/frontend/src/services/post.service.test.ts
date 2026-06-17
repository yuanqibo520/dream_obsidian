import { describe, expect, it } from "vitest";
import { createPost, favoritePost, getPostById, getPosts, likePost } from "./post.service";

describe("post.service mock mode", () => {
  it("creates posts and exposes them through the list API", async () => {
    const post = await createPost({
      title: "测试发布帖子",
      content: "这是一条用于验证 mock 数据闭环的帖子正文。",
      channelId: "study-help",
      isAnonymous: false,
      imageUrls: [],
    });

    const list = await getPosts({ channelId: "study-help", sort: "latest" });

    expect(list.items[0].id).toBe(post.id);
    expect(list.items[0].authorId).toBeTruthy();
    expect(list.items[0].status).toBe("published");
  });

  it("toggles like and favorite state", async () => {
    const post = await getPostById("p_1");
    const liked = await likePost(post.id);
    const favorited = await favoritePost(post.id);

    expect(liked.isLiked).toBe(!post.isLiked);
    expect(favorited.isFavorited).toBe(!post.isFavorited);
  });
});
