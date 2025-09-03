import api from "@/lib/axios";

export const getMe = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (data: FormData) => {
  try {
    const response = await api.post("/users", data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id: string, data: FormData) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
