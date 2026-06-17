import { Tabs } from "../../common/Tabs";

type ProfileTab = "posts" | "comments" | "favorites";

type ProfileTabsProps = {
  value: ProfileTab;
  onChange: (value: ProfileTab) => void;
};

export function ProfileTabs({ value, onChange }: ProfileTabsProps) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      items={[
        { label: "我的帖子", value: "posts" },
        { label: "我的评论", value: "comments" },
        { label: "我的收藏", value: "favorites" },
      ]}
    />
  );
}
