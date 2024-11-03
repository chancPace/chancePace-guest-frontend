import { ReviewData } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/review';

export const addReview = async (reviewData: ReviewData, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/add-review`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('리뷰등록 실패', error);
    throw error;
  }
};

export const updateRatingBySpace = async (spaceId: number) => {
  try {
    const response = await axios.patch(`${API_URL}/update-rating-by-space`, {
      spaceId,
    });
    return response.data;
  } catch (error) {
    console.error('별점 평균 업데이트 실패', error);
    throw error;
  }
};

export const updateReview = async (reviewData:ReviewData) => {
  try {
    const response = await axios.patch(`${API_URL}/update-review`,reviewData)
    return response.data
  } catch (error) {
    console.error('리뷰 수정 실패', error);
    throw error;
  }
};

export const getReviewBySpace = async (spaceId: number) => {
  try {
    const response = await axios.get(`${API_URL}/get-review-by-space`, {
      params: { spaceId },
    });
    return response.data;
  } catch (error) {
    console.error('리뷰정보를 갖고오는데 실패했습니다', error);
    throw error;
  }
};

export const getMyReview = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/get-my-review`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('리뷰 정보를 갖고오는데 실패했습니다', error);
    throw error;
  }
};
