import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL

export const fetchFromAPI = async (endpoint: string) => {
    try {
      const response = await axios.get(`${URL}${endpoint}`);
      return await response.data;
    } 
    catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };