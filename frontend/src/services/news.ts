import api from "@/lib/axios";
import { News, NewsFormData, NewsUpdateFormData } from "@/types/news";

export const getAllNews = async () => {
  try {
    const response = await api.get("/news");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all news:", error);
    throw error;
  }
};

export const getNews = async (id: string) => {
  try {
    const response = await api.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const getNewsComments = async (newsId: number) => {
  try {
    const response = await api.get(`/news/${newsId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news comments:", error);
    throw error;
  }
};

export const createNews = async (data: FormData) => {
  try {
    const response = await api.post("/news", data);
    return response.data;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

export const createNewsComment = async (newsId: number, content: string) => {
  try {
    const response = await api.post(`/news/${newsId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error("Error creating news comment:", error);
    throw error;
  }
};

export const updateNews = async (id: number, data: NewsUpdateFormData) => {
  try {
    console.log(id);
    console.log(data);
    const response = await api.put(`/news/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

export const deleteNews = async (id: number) => {
  try {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};
