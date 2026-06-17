import { ImagePlus, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { channels } from "../../../app/constants";
import { postSchema } from "../../../lib/validators";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { Textarea } from "../../common/Textarea";
import type { CreatePostRequest } from "../../../types/post";

type PostEditorProps = {
  onSubmit: (payload: CreatePostRequest) => void;
  submitting?: boolean;
};

type FormValues = {
  title: string;
  content: string;
  channelId: string;
  isAnonymous: boolean;
  location?: string;
};

export function PostEditor({ onSubmit, submitting }: PostEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { channelId: "campus-news", isAnonymous: false },
  });

  return (
    <form className="glass-panel rounded-glass p-5" onSubmit={handleSubmit((values) => onSubmit({ ...values, imageUrls: [] }))}>
      <div className="grid gap-4">
        <div>
          <Input placeholder="给帖子起一个清楚的标题" {...register("title")} />
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p>}
        </div>
        <div>
          <Textarea placeholder="写下正文，分享你的校园发现、问题或线索..." {...register("content")} />
          {errors.content && <p className="mt-1 text-xs text-rose-500">{errors.content.message}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <select className="rounded-xl border border-line bg-white/70 px-4 py-3 text-sm outline-none" {...register("channelId")}>
            {channels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
          <Input placeholder="地点，可选" {...register("location")} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-muted">
          <input type="checkbox" className="h-4 w-4 rounded border-line accent-primary" {...register("isAnonymous")} />
          匿名发布，前台隐藏真实身份
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" disabled>
            <ImagePlus className="h-4 w-4" />
            上传图片
          </Button>
          <Button type="button" variant="secondary" disabled>
            <MapPin className="h-4 w-4" />
            定位
          </Button>
          <Button className="ml-auto" type="submit" disabled={submitting}>
            <Send className="h-4 w-4" />
            {submitting ? "发布中..." : "发布帖子"}
          </Button>
        </div>
      </div>
    </form>
  );
}
