import type { User } from "./user";

export type LoginRequest = {
  account: string;
  password: string;
  remember: boolean;
};

export type RegisterRequest = {
  phone: string;
  password: string;
  realName: string;
  studentNo: string;
  school: string;
};

export type AuthSession = {
  token: string;
  user: User;
};
