import { message } from 'antd';
import axios, { AxiosError } from 'axios';
interface ErrorResponseData {
  message: string;
}
const API_URL = 'http://localhost:4000/api/space';

export const getSpace = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-space`);
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseData>;
    if (axiosError.response) {
      message.error(axiosError.response.data.message);
    }
  }
};
