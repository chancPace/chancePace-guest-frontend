import axios from 'axios';

const isLocal = process.env.NODE_ENV === 'development';

const API_URL = `${
  isLocal
    ? `http://${process.env.NEXT_PUBLIC_LOCAL_HOST}:${process.env.NEXT_PUBLIC_LOCAL_PORT}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
}/api/wishlist`;

export const addWishlist = async (userId: number, spaceId: number) => {
  try {
    const response = await axios.post(`${API_URL}/add-wishlist`, {
      userId,
      spaceId,
    });
    return response.data;
  } catch (error) {
    console.error('찜 실패', error);
    throw error;
  }
};

export const removeWishlist = async (wishlistId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/remove-wishlist`, {
      data: { wishlistId },
    });
    return response.data;
  } catch (error) {
    console.error('찜 목록 삭제 실패');
    throw error;
  }
};

export const getWishlist = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/get-wishlist`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('찜 목록 불러오기 실패', error);
    throw error;
  }
};
