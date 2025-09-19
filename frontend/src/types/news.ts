export type News = {
  id: number;
  shortId: string;
  title: string;
  content: string;
  date: string;
  reactionCount: number;
  commentCount: number;
  files?: {
    id: number;
    urlFile: string;
    fileableId: number;
  }[];
};

export type NewsFormData = {
  title: string;
  content: string;
  date: string;
  file?: FileList;
};

export type NewsUpdateFormData = {
  title?: string;
  content?: string;
  date?: string;
  file?: FileList;
};
