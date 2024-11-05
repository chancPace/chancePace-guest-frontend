export interface SignupData {
  email: string;
  password: string;
  role: string;
  agreed: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface HostMainImg {
  src: string;
}

export interface Explanation {
  img: { src: string };
  title: string;
  text: string;
}

export interface Procedure {
  index: string;
  img: { src: string };
  title: string;
  text: string;
}

export interface Space {
  id: number;
  Images: {
    id: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }[];
  spaceName: string;
  spaceLocation: string;
  description: string;
  spacePrice: number;
  discount: number;
  amenities: string[]; // 편의시설 목록 (문자열 배열)
  cleanTime: number;
  spaceStatus: string; // 공간의 상태 ('AVAILABLE' 또는 'UNAVAILABLE')
  isOpen: boolean; // 공간이 열려 있는지 여부
  guidelines: string; // 주의사항 (문자열 배열)
  categoryId: number;
  Minimum: number; // 최소 인원
  maxGuests: number; // 최대 인원
  spaceImg: { src: string }[]; // 공간 이미지 배열
  businessStartTime: number;
  businessEndTime: number;
  addPrice: number;
  spaceRating: number;
  spaceAdminPhoneNumber: string;
}

export interface CategoryType {
  id: number;
  categoryName: string;
  pId: number;
}

export interface Payment {
  paymentKey: string;
  orderId: string;
  amount: number;
  couponPrice?: number;
}

export interface UserData {
  email?: string;
  id: number;
  password?: string;
  phoneNumber?: string;
  userName?: string;
  gender?: 'MALE' | 'FEMALE';
  role?: 'USER' | 'HOST' | 'ADMIN';
  bankAccountName?: string;
  bankAccountOwner?: string;
  bankAccountNumber?: string;
}

export interface BookingData {
  startDate: string;
  startTime: number;
  endTime: number;
  userId: number;
  spaceId: number;
}
export interface MyBookingData {
  id: number;
  bookingStatus: string;
  createdAt?: string;
  updatedAt: string;
  endTime: number;
  spaceId: number;
  startDate: string;
  startTime: number;
  userId: number;
  space?: Space;
}

export interface ReviewData {
  spaceId: number;
  reviewComment: string;
  reviewRating: number;
}
export interface GetReviewData {
  createdAt: string;
  spaceId: number;
  reviewComment: string;
  reviewRating: number;
  id: number;
  reviewStatus: string;
  updatedAt: string;
  userId: 1;
  User?: { email: string };
}

export interface CouponData {
  id?: number;
  expirationDate?: string;
  userId?: number;
}

export interface UserCoupon {
  couponCode: string;
  couponId: number;
  createdAt: string;
  expirationDate: string;
  id: number;
  isUsed: boolean;
  updatedAt: string;
  userId: number;
  Coupon: {
    couponName: string;
    createdAt: string;
    discountPrice: number;
    id: number;
    isActive: boolean;
    updatedAt: string;
    userId: number;
  };
}
