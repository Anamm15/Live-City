// import { SERVER_API } from "@/constants/api";
import axios from "axios";

// const API_URL = SERVER_API + "/submissions/";

export const createSubmission = async (data: FormData) => {
   try {
      const response = await axios.post("http://localhost:8000/api/v1/submissions", data, {
         headers: {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTY2MzQyMDgsImV4cCI6MTc1NjYzNzgwOH0.414_VbKFltrr8ws8cnaC4DjlEcDD9rGCDkutzX1d2kw`,
            "Content-Type": "multipart/form-data",
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error creating submission:", error);
      throw error;
   }
}
