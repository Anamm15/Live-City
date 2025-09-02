// import { SERVER_API } from "@/constants/api";
import { SERVER_API } from "@/constants/api";
import axios from "axios";

const API_URL = SERVER_API + "/submissions";

export const createSubmission = async (data: FormData) => {
  try {
    alert(API_URL);
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTY4MTc1MzMsImV4cCI6MTc1NjgyMTEzM30.aLT3IQ7URfLUou6JLT3caTAciDvZsdhXAi3tUk9fPRQ`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};
