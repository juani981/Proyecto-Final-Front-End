import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
});

export const postToDataBase = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
};
export const getAllFromDatabase = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};
export const getOneFromDataBase = async (endpoint, id) => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};
