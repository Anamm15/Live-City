import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Poll, PollCreateFormData, PollUpdateFormData } from "@/types/polls";

export const getPolls = async (): Promise<Poll[]> => {
  try {
    const response = await api.get<ApiResponse<Poll[]>>("/polls");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw error;
  }
};

export const getPollById = async (id: string): Promise<Poll> => {
  try {
    const response = await api.get<ApiResponse<Poll>>(`/polls/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching poll:", error);
    throw error;
  }
};

export const getPollsVoters = async (id: string): Promise<Poll> => {
  try {
    const response = await api.get<ApiResponse<Poll>>(`/polls/${id}/voters`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching poll:", error);
    throw error;
  }
};

export const createPoll = async (data: PollCreateFormData) => {
  try {
    const response = await api.post("/polls", data);
    return response.data;
  } catch (error) {
    console.error("Error creating poll:", error);
    throw error;
  }
};

export const updatePoll = async (id: number, data: PollUpdateFormData) => {
  try {
    const response = await api.put(`/polls/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating poll:", error);
    throw error;
  }
};

export const deletePoll = async (id: number) => {
  try {
    const response = await api.delete(`/polls/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting poll:", error);
    throw error;
  }
};

export const votes = async (id: number, data: { pollOptionId: number }) => {
  try {
    const response = await api.post(`/polls/${id}/votes`, data);
    return response.data;
  } catch (error) {
    console.error("Error voting:", error);
    throw error;
  }
};

export const deleteVotePoll = async (id: number) => {
  try {
    const response = await api.delete(`/polls/${id}/votes`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vote:", error);
    throw error;
  }
};
