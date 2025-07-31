export type GetNewsResponse = {
   id: number;
   title: string;
   date: Date;
   content: string;
   reactionCount: number;
   commentCount: number;
};

export type NewsCommentResponse = {
   id: number;
   content: string;
   createdAt: Date;
   user: {
      id: number;
      name: string;
   }
}

export type NewsReactionResponse = {
   id: number;
   createdAt: Date;
   user: {
      id: number;
      name: string;
   }
}

export type CreateNewsRequest = {
   title: string;
   date: Date;
   content: string;
}

export type UpdateNewsRequest = {
   id: number;
   title?: string;
   date?: Date;
   content?: string;
}

export type CreateNewsCommentRequest = {
   content: string;
   newsId: number;
   userId: number;
}

export type CreateNewsReactionRequest = {
   newsId: number;
   userId: number;
}