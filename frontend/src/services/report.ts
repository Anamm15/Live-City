import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Report, ReportResponseUpdateData } from "@/types/report";

export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get<ApiResponse<Report[]>>("/reports");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const getReportById = async (id: number): Promise<Report> => {
  try {
    const response = await api.get<ApiResponse<Report>>(`/reports/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching report:", error);
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

export const updateReport = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`/reports/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
};

export const updateReportResponse = async (
  id: number,
  data: ReportResponseUpdateData
) => {
  try {
    const response = await api.patch(`/reports/${id}/response`, data);
    return response;
  } catch (error) {
    console.error("Error updating report response:", error);
    throw error;
  }
};

export const deleteReport = async (id: number) => {
  try {
    const response = await api.delete(`/reports/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
};
