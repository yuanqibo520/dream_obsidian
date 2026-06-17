import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

type CommentComposerProps = {
  onSubmit: (content: string) => void;
  submitting?: boolean;
};

export function CommentComposer({ onSubmit, submitting }: CommentComposerProps) {
  const [content, setContent] = useState("");

  return (
    <form
      className="surface-card flex gap-3 rounded-[22px] p-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!content.trim() || submitting) return;
        onSubmit(content);
        setContent("");
      }}
    >
      <Input value={content} onChange={(event) => setContent(event.target.value)} placeholder="友善评论，帮同学把问题说清楚" />
      <Button type="submit" disabled={submitting}>
        <Send className="h-4 w-4" />
        {submitting ? "发送中" : "发送"}
      </Button>
    </form>
  );
}
