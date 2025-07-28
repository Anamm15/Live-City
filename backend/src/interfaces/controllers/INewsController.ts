export interface INewsController {
   getNews(): Promise<News[]>;
   getNewsById(newsId: string): Promise<News | null>;
   createNews(news: News): Promise<News>;
   updateNews(news: News): Promise<News>;
   deleteNews(newsId: string): Promise<void>;
}