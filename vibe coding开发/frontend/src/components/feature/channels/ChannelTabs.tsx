import { channels } from "../../../app/constants";
import { Badge } from "../../common/Badge";

type ChannelTabsProps = {
  active?: string;
};

export function ChannelTabs({ active }: ChannelTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((channel) => (
        <Badge key={channel.id} tone={channel.id === active ? "blue" : "gray"}>
          {channel.name}
        </Badge>
      ))}
    </div>
  );
}
