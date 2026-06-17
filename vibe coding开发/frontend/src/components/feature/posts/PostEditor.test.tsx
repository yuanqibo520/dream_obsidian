import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PostEditor } from "./PostEditor";

describe("PostEditor", () => {
  it("submits a valid post payload", async () => {
    const onSubmit = vi.fn();
    render(<PostEditor onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("给帖子起一个清楚的标题"), { target: { value: "校园活动推荐" } });
    fireEvent.change(screen.getByPlaceholderText("写下正文，分享你的校园发现、问题或线索..."), {
      target: { value: "今晚操场有音乐社团活动，欢迎大家一起参加。" },
    });
    fireEvent.click(screen.getByRole("button", { name: /发布帖子/ }));

    expect(await screen.findByRole("button", { name: /发布帖子/ })).not.toBeNull();
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: "校园活动推荐", imageUrls: [] }));
    });
  });
});
