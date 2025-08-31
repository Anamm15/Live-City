import { SERVER_API } from "@/constants/api";
import axios from "axios";

const API_URL = SERVER_API + "/reports";

export const createReport = async (data: FormData) => {
   try {
     const response = await axios.post(API_URL, data, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
       withCredentials: true,
     });
     return response.data;
   } catch (error) {
     console.error("Error creating submission:", error);
     throw error;
   }
}
