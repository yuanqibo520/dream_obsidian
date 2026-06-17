import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../common/Button";

type ChannelCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ChannelCard({ title, description, href }: ChannelCardProps) {
  return (
    <div className="glass-panel rounded-glass p-5">
      <h3 className="text-lg font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <Button className="mt-4" variant="secondary">
        <Link className="inline-flex items-center gap-2" to={href}>
          进入板块
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
