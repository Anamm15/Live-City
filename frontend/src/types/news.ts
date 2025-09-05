export type News = {
  id: number;
  shortId: string;
  title: string;
  content: string;
  date: string;
  reactionCount: number;
  commentCount: number;
  imageUrl?: string;
};
