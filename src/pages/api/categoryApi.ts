import axios from 'axios';

const API_URL = 'http://localhost:4000/api/category';

export const getCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-category`);
    return response.data;
  } catch (error) {
    console.error('카테고리 가져오는 중 오류', error);
    throw error;
  }
};
