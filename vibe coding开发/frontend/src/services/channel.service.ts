import { channels, USE_MOCK_API } from "../app/constants";
import type { Channel } from "../types/channel";
import { apiGet } from "./http";

export async function getChannels(): Promise<Channel[]> {
  if (!USE_MOCK_API) {
    return apiGet<Channel[]>("/channels");
  }
  return channels;
}

export async function getChannelById(channelId: string): Promise<Channel | undefined> {
  if (!USE_MOCK_API) {
    return apiGet<Channel>(`/channels/${channelId}`);
  }
  return channels.find((channel) => channel.id === channelId);
}
