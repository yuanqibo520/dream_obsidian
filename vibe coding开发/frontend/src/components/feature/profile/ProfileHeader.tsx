import { Avatar } from "../../common/Avatar";
import { Badge } from "../../common/Badge";
import type { User } from "../../../types/user";

type ProfileHeaderProps = {
  user: User;
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section className="glass-panel rounded-glass p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar src={user.avatarUrl} alt={user.nickname} size="lg" />
        <div>
          <h1 className="text-2xl font-extrabold text-ink">{user.nickname}</h1>
          <p className="mt-1 text-sm text-muted">{user.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{user.school}</Badge>
            <Badge tone="green">{user.grade}</Badge>
            <Badge tone="gray">{user.major}</Badge>
            <Badge tone="yellow">{user.activityPoints} pt</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
