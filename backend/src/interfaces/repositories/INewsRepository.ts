export interface INewsRepository {
   getNews(): Promise<News[]>;
   createNews(news: News): Promise<News>;
   updateNews(news: News): Promise<News>;
   deleteNews(newsId: string): Promise<void>;
   createNewsComment(newsId: string, comment: NewsComment): Promise<NewsComment>;
   getNewsComments(newsId: string): Promise<NewsComment[]>;
   deleteNewsComment(newsId: string, commentId: string): Promise<void>;
   getNewsCommentsByNewsId(newsId: string): Promise<NewsComment[]>;
   getNewsReactions(newsId: string): Promise<NewsReaction[]>;
   reactToNews(newsId: string, reaction: NewsReaction): Promise<NewsReaction>;
}