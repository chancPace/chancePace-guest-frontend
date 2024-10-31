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
  spaceName: string;
  spaceLocation: string;
  description: string;
  spacePrice: number;
  discount: number;
  amenities: string[]; // 편의시설 목록 (문자열 배열)
  cleanTime: number;
  spaceStatus: string; // 공간의 상태 ('AVAILABLE' 또는 'UNAVAILABLE')
  isOpen: boolean; // 공간이 열려 있는지 여부
  caution: string[]; // 주의사항 (문자열 배열)
  category: {
    mainCategory: string;
    subCategory: string;
  };
  Minimum: number; // 최소 인원
  Maximum: number; // 최대 인원
  spaceImg: { src: string }[]; // 공간 이미지 배열
  businessStartTime: number;
  businessEndTime: number;
  addPrice: number;
}

export interface CategoryType {
  categoryName: string;
  mainCategory: string;
  subCategories: string[];
}

export interface Payment {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface UserData {
  email?: string;
  id: number;
  password?: string;
  phoneNumber?: string;
  userName?: string;
}

export interface BookingData {
  startDate: string; // 예: ISO 형식의 날짜 문자열
  startTime: number; // 시작 시간 (예: 시간 인덱스 또는 시간 값)
  endTime: number; // 종료 시간
  userId: number; // 사용자 ID
  spaceId: number; // 공간 ID
}