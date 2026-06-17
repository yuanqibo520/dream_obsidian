import { z } from "zod";

export const loginSchema = z.object({
  account: z.string().min(1, "请输入手机号或账号"),
  password: z.string().min(6, "密码至少 6 位"),
  remember: z.boolean().default(true),
});

export const registerSchema = z.object({
  phone: z.string().min(11, "请输入有效手机号"),
  password: z.string().min(6, "密码至少 6 位"),
  realName: z.string().min(2, "请输入真实姓名"),
  studentNo: z.string().min(4, "请输入学号"),
  school: z.string().min(1, "请选择学校"),
});

export const postSchema = z.object({
  title: z.string().min(4, "标题至少 4 个字").max(80, "标题不能超过 80 个字"),
  content: z.string().min(10, "正文至少 10 个字").max(2000, "正文不能超过 2000 字"),
  channelId: z.string().min(1, "请选择板块"),
  isAnonymous: z.boolean(),
  location: z.string().optional(),
});
