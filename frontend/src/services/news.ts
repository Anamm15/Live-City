import api from "@/lib/axios";

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

export const createNews = async (data: FormData) => {
  try {
    const response = await api.post("/news", data);
    return response.data;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

export const updateNews = async (id: string, data: FormData) => {
  try {
    const response = await api.put(`/news/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

export const deleteNews = async (id: string) => {
  try {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
};
