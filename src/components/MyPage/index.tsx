import { MyPageStyled } from './styled';
import { Tabs, Form } from 'antd';
import { useEffect, useState } from 'react';
import { getUser } from '@/pages/api/userApi';
import { GetReviewData, MyBookingData, Space, UserData } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { getAllBooking } from '@/pages/api/bookingApi';
import MyBooking from '../MyBooking';
import { getSpace } from '@/pages/api/spaceApi';
import ReviewList from '../ReviewList';
import { getMyReview } from '@/pages/api/reviewApi';
import EditUser from '../EditUser';
import Cookies from 'js-cookie';
import { logout } from '@/redux/slices/userSlice';

const MyPage = () => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [userBooking, setUserBooking] = useState([]);
  const [userReviews, setUserReviews] = useState<GetReviewData[]>([]); // 리뷰 데이터 상태 추가

  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(logout());
    router.replace('/');
  };

  useEffect(() => {
    if (!userInfo) {
      router.replace('/');
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsPasswordConfirm(false);
        setShowPasswordInput(true);
        const response = await getUser();
        setUserData(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 오류 발생', error);
      }
    };
    fetchUserData();
  }, [form]);

  const fetchUserData = async () => {
    try {
      if (userInfo?.id) {
        // 리뷰 가져오기
        const reviews = await getMyReview(userInfo.id);
        setUserReviews(reviews.data);

        // 예약 내역 가져오기
        const allBooking = await getAllBooking();
        console.log(allBooking,'올부킹')
        const myBooking = allBooking.data.filter(
          (booking: MyBookingData) => booking.userId === userInfo.id
        );

        const allSpace = await getSpace();
        const bookingWithSpace = myBooking.map((booking: MyBookingData) => {
          const matchSpace = allSpace.data.find(
            (space: Space) => space.id === booking.spaceId
          );
          return { ...booking, space: matchSpace };
        });

        setUserBooking(bookingWithSpace); // 예약 데이터 상태 업데이트
      }
    } catch (error) {
      console.error('데이터 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userInfo]);

  const tabItems = [
    {
      label: '계정정보',
      key: '1',
      children: (
        <div className="user-info">
          <div className="user-info-top">
            <div className="user-id">
              <p>{userData?.email}</p>
              <p>{userData?.userName}</p>
            </div>
          </div>
          <div className="user-bottom">
            <EditUser
              userData={userData}
              setUserData={setUserData}
              isPasswordConfirm={isPasswordConfirm}
              setIsPasswordConfirm={setIsPasswordConfirm}
              showPasswordInput={showPasswordInput}
              setShowPasswordInput={setShowPasswordInput}
            />
          </div>
        </div>
      ),
    },
    {
      label: '예약내역',
      key: '2',
      children: (
        <div className="my-booking">
          {userBooking?.map((x, i) => {
            return <MyBooking key={i} x={x} />;
          })}
        </div>
      ),
    },
    {
      label: '리뷰내역',
      key: '3',
      children: (
        <div>
          {userReviews?.map((x, i) => {
            return (
              <ReviewList
                x={x}
                key={i}
                fetchUserData={fetchUserData}
                isDeletable={true}
              />
            ); // 삭제 버튼 활성화
          })}
        </div>
      ),
    },
  ];

  return (
    <MyPageStyled>
      <Tabs tabPosition="left" items={tabItems} />
      <p className="logout" onClick={handleLogout}>
        로그아웃
      </p>
    </MyPageStyled>
  );
};

export default MyPage;
