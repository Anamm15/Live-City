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

export const getSubmissionById = async (id: number): Promise<Submission> => {
  try {
    const response = await api.get<ApiResponse<Submission>>(
      `/submissions/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching submission:", error);
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

export const updateSubmission = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`/submissions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating submission:", error);
    throw error;
  }
};

export const updateSubmissionStatus = async (id: number, status: string) => {
  try {
    const response = await api.patch(`/submissions/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating submission status:", error);
    throw error;
  }
};

export const deleteSubmission = async (id: number) => {
  try {
    const response = await api.delete(`/submissions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
};
