import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Report } from "@/types/report";

export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get<ApiResponse<Report[]>>("/reports");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const createReport = async (data: FormData) => {
  try {
    const response = await api.post("/reports", data);
    return response;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};
