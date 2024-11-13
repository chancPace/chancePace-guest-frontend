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
  images: {
    id: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    spaceId?: number; // 선택적 속성으로 변경
  }[];
  bookings?: BookingData[]
  categoryId: number;
  userId: number;
  spaceRating: number | null;
  guidelines: string; // 주의사항 (문자열 배열)
  businessStartTime: number;
  businessEndTime: number;
  isOpen: boolean; // 공간이 열려 있는지 여부
  minGuests: number; // 최소 인원
  maxGuests: number; // 최대 인원
  cleanTime: number;
  spaceStatus: string; // 공간의 상태 ('AVAILABLE' 또는 'UNAVAILABLE')
  amenities: string; // 편의시설 목록 (문자열 배열)
  discount: number;
  addPrice: number;
  spacePrice: number;
  description: string;
  spaceLocation: string;
  spaceName: string;
  spaceAdminPhoneNumber: string;
  spaceAdminName: string;
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
  payment?: {
    cardNumber: string;
    cardType: string;
    couponPrice: number;
    createdAt: string;
    id: number;
    orderId: string;
    paymentKey: string;
    paymentMethod: string;
    paymentPrice: number;
    paymentStatus: string;
    suppliedPrice: number;
    updatedAt: string;
    userId: number;
    vat: number;
  };
  space?: {
    addPrice: number;
    amenities: string;
    businessEndTime: number;
    businessStartTime: number;
    categoryId: number;
    cleanTime: number;
    createdAt: string;
    description: string;
    discount: number;
    guidelines: string;
    id: number;
    isOpen: boolean;
    maxGuests: number;
    minGuests: number;
    spaceAdminName: string;
    spaceAdminPhoneNumber: string;
    spaceLocation: string;
    spaceName: string;
    spacePrice: number;
    spaceRating: null;
    spaceStatus: string;
    updatedAt: string;
    userId: number;
    images: {
      id: number;
      imageUrl: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
  user?: {
    accountStatus: string;
    bankAccountName: string;
    bankAccountNumber: string;
    bankAccountOwner: string;
    createdAt: string;
    email: string;
    gender: string;
    id: number;
    isMarketingAgreed: boolean;
    kakaoId: string;
    lastLogin: string;
    password: string;
    phoneNumber: string;
    role: string;
    updatedAt: string;
    userName: string;
  };
  review?: {
    spaceId: number;
    reviewComment: string;
    reviewRating: number | null;
  };
}

export interface ReviewData {
  spaceId: number;
  reviewComment: string;
  reviewRating: number | null;
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
  user?: { email: string };
  space?: {
    spaceName: string;
    id: number;
    images?: {
      imageUrl: string;
    }[];
  };
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
  coupon: {
    couponName: string;
    createdAt: string;
    discountPrice: number;
    id: number;
    isActive: boolean;
    updatedAt: string;
    userId: number;
  };
}

export interface Wishlist {
  id: number;
  spaceId: number;
  userId: number;
  space?: {
    id: number;
    spaceName: string;
    spacePrice: number;
    discount: number;
    images?: {
      imageUrl: string;
    }[];
  };
}

export interface inquiryData {
  email: string;
  title: string;
  contents: string;
  memberType: string;
}
