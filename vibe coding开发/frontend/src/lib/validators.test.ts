import { describe, expect, it } from "vitest";
import { postSchema, registerSchema } from "./validators";

describe("validators", () => {
  it("accepts a valid post payload", () => {
    const result = postSchema.safeParse({
      title: "校园活动推荐",
      content: "今晚操场有音乐社团活动，欢迎大家一起参加。",
      channelId: "campus-news",
      isAnonymous: false,
    });

    expect(result.success).toBe(true);
  });

  it("rejects incomplete registration data", () => {
    const result = registerSchema.safeParse({
      phone: "123",
      password: "123",
      realName: "",
      studentNo: "",
      school: "",
    });

    expect(result.success).toBe(false);
  });
});
