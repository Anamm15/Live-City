import api from "@/lib/axios";

export const createReport = async (data: FormData) => {
  try {
    const response = await api.post("/reports", data);
    return response;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};
