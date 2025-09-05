import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Submission } from "@/types/submission";

export const getSubmissions = async (): Promise<Submission[]> => {
  try {
    const response = await api.get<ApiResponse<Submission[]>>("/submissions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

export const createSubmission = async (data: FormData) => {
  try {
    const response = await api.post("/submissions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};
