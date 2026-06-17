export type User = {
  id: string;
  role: "student" | "moderator" | "admin";
  nickname: string;
  avatarUrl: string;
  school: string;
  grade: string;
  major: string;
  bio: string;
  activityPoints: number;
};

export type UserSettings = {
  pushEnabled: boolean;
  privacyMode: boolean;
  doNotDisturb: boolean;
  theme: "light" | "dark" | "system";
};
