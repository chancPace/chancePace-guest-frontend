import { MyPageStyled } from './styled';
import { Tabs, Form } from 'antd';
import { useEffect, useState } from 'react';
import { getUser } from '@/pages/api/userApi';
import {
  GetReviewData,
  MyBookingData,
  Space,
  UserData,
  Wishlist,
} from '@/types';
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
import { getWishlist, removeWishlist } from '@/pages/api/wishlistApi';
import { off } from 'process';
import ItemList from '../ItemList';

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
  const [wishList, setWishList] = useState<Wishlist[]>([]);

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

  //찜 목록 불러오기
  const fetchWishlist = async () => {
    if (userInfo?.id) {
      try {
        const response = await getWishlist(userInfo.id);
        setWishList(response.data);
      } catch (error) {
        console.error('찜 목록 불러오기 실패', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchWishlist();
  }, [userInfo]);

  //찜 삭제
  const deleteWishlistItem = async (wishlistId: number) => {
    try {
      await removeWishlist(wishlistId);
      setWishList((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error('찜 목록 삭제 실패', error);
    }
  };

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
            );
          })}
        </div>
      ),
    },
    {
      label: '찜',
      key: '4',
      children: (
        <div className="wish">
          {wishList.length > 0 ? (
            wishList.map((x, i) => {
              return (
                <div className="wish-list" key={x.id}>
                  <p>{x.space?.spaceName}</p>
                  <div className="img-box">
                    {x.space?.images && x.space.images.length > 0 ? (
                      <img
                        src={`http://localhost:4000/${x.space.images[0].imageUrl}`}
                        className="wish-img"
                        alt="Space Image"
                      />
                    ) : (
                      <p>이미지가 없습니다</p> // 이미지가 없을 경우 표시할 내용
                    )}
                  </div>
                  <p>{x.space?.spacePrice}</p>
                  <button
                    onClick={() => deleteWishlistItem(x.id)} // 삭제 버튼 클릭 시 해당 항목 삭제
                    className="delete-wishlist-button"
                  >
                    삭제
                  </button>
                </div>
              );
            })
          ) : (
            <p>찜 목록이 없습니다.</p>
          )}
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
