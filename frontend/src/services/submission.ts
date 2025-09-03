import api from "@/lib/axios";

export const createSubmission = async (data: FormData) => {
  try {
    const response = await api.post("/submissions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};
