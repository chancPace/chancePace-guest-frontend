import { MyPageStyled } from './styled';
import { Pagination, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { getUser } from '@/pages/api/userApi';
import { GetReviewData, MyBookingData, UserData, Wishlist } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { getMyBooking } from '@/pages/api/bookingApi';
import MyBooking from '../MyBooking';
import ReviewList from '../ReviewList';
import { getMyReview } from '@/pages/api/reviewApi';
import EditUser from '../EditUser';
import Cookies from 'js-cookie';
import { logout } from '@/redux/slices/userSlice';
import { getWishlist, removeWishlist } from '@/pages/api/wishlistApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faCalendarCheck,
  faCalendarXmark,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import WishList from '../WishList';

const MyPage = () => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [userBooking, setUserBooking] = useState<MyBookingData[]>([]);
  const [userReviews, setUserReviews] = useState<GetReviewData[]>([]); // 리뷰 데이터 상태 추가
  const [wishList, setWishList] = useState<Wishlist[]>([]);
  const [isBookingFetched, setIsBookingFetched] = useState(false);
  const [isReviewFetched, setIsReviewFetched] = useState(false);
  const [isWishFetched, setIsWishFetched] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const [cancleOrder, setCancleOrder] = useState(0);
  const [completedOrder, setCompletedOrder] = useState(0);
  const [upcomingOrder, setUpcomingOrder] = useState(0);

  //페이지네이션 상태관리
  const [currentBookingPage, setCurrentBookingPage] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentWishPage, setCurrentWishPage] = useState(1);
  const pageSize = 5; // 한 페이지에 표시할 항목 수



  //쿠키 검사해서 없으면 리덕스 날리기
  useEffect(() => {
    const token = Cookies.get('token');
    // 쿠키가 없고 로그인 상태라면 로그아웃 처리
    if (!token) {
      dispatch(logout());
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsPasswordConfirm(false);
        setShowPasswordInput(true);
        const response = await getUser();
        setUserData(response.data);
      } catch (error) {
        // console.error('사용자 데이터를 가져오는 중 오류 발생', error);
      }
    };
    fetchUserData();
  }, []);

  // 예약 데이터 불러오기
  const fetchUserBooking = async () => {
    try {
      if (userInfo?.id) {
        const myBooking = await getMyBooking(userInfo.id);
        setUserBooking(myBooking.data);
        setIsBookingFetched(true);

        //취소건 제외한 모든 예약 갯수
        const noCancellBooking = myBooking.data.filter(
          (booking: MyBookingData) => booking.bookingStatus !== 'CANCELLED'
        );
        setTotalOrder(noCancellBooking.length);

        const today = new Date();

        const completedBookings = noCancellBooking.filter(
          (booking: MyBookingData) => {
            const bookingDate = new Date(booking.startDate);

            // 오늘 날짜인 경우, `endTime` 기준으로 상태 결정
            if (bookingDate.toDateString() === today.toDateString()) {
              return booking.endTime <= today.getHours();
            }

            // 오늘 이전 날짜인 경우 `이용 완료`
            return bookingDate < today;
          }
        ).length;
        setCompletedOrder(completedBookings);

        const upcomingBookings = noCancellBooking.filter(
          (booking: MyBookingData) => {
            const bookingDate = new Date(booking.startDate);

            // 오늘 날짜인 경우, `endTime` 기준으로 상태 결정
            if (bookingDate.toDateString() === today.toDateString()) {
              return booking.endTime > today.getHours();
            }

            // 오늘 이후 날짜인 경우 `이용 전`
            return bookingDate > today;
          }
        ).length;
        setUpcomingOrder(upcomingBookings);
        // 취소건 갯수 필터링
        const cancleOrders = myBooking.data.filter(
          (booking: MyBookingData) => booking.bookingStatus === 'CANCELLED'
        ).length;
        setCancleOrder(cancleOrders);
      }
    } catch (error) {
      // console.error('예약 데이터를 가져오는 중 오류 발생', error);
    }
  };

  // 리뷰 데이터 불러오기
  const fetchUserReviews = async () => {
    try {
      if (userInfo?.id) {
        const reviews = await getMyReview(userInfo.id);
        setUserReviews(reviews.data);
        setIsReviewFetched(true);
      }
    } catch (error) {
      // console.error('리뷰 데이터를 가져오는 중 오류 발생', error);
    }
  };

  // 찜 목록 데이터 불러오기
  const fetchWishlist = async () => {
    try {
      if (userInfo?.id) {
        const response = await getWishlist(userInfo.id);
        setWishList(response.data);
        setIsWishFetched(true);
      }
    } catch (error) {
      // console.error('찜 목록 데이터를 가져오는 중 오류 발생', error);
    }
  };

  const handleTabClick = (key: string) => {
    if (key === '2' && !isBookingFetched) {
      fetchUserBooking();
    } else if (key === '3' && !isReviewFetched) {
      fetchUserReviews();
    } else if (key === '4' && !isWishFetched) {
      fetchWishlist();
    }
  };

  //찜 삭제
  const deleteWishlistItem = async (wishlistId: number) => {
    try {
      await removeWishlist(wishlistId);
      setWishList((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (error) {
      // console.error('찜 목록 삭제 실패', error);
    }
  };

  //페이지네이션 핸들러
  const handleBookingPageChange = (page: number) => setCurrentBookingPage(page);
  const handleReviewPageChange = (page: number) => setCurrentReviewPage(page);
  const handleWishPageChange = (page: number) => setCurrentWishPage(page);

  const paginatedBookings = userBooking.slice(
    (currentBookingPage - 1) * pageSize,
    currentBookingPage * pageSize
  );
  const paginatedReviews = userReviews.slice(
    (currentReviewPage - 1) * pageSize,
    currentReviewPage * pageSize
  );
  const paginatedWishlist = wishList.slice(
    (currentWishPage - 1) * pageSize,
    currentWishPage * pageSize
  );

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
        <>
          <div className="my-booking">
            <div className="my-booking-board">
              <div>
                <p className="my-booking-board-title">총 주문 수</p>
                <div className="board-list">
                  <div className="icon-box">
                    <FontAwesomeIcon icon={faStore} />
                  </div>
                  <p>{totalOrder}</p>
                </div>
              </div>
              <div>
                <p className="my-booking-board-title">이용 완료</p>
                <div className="board-list">
                  <div className="icon-box">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                  </div>
                  <p>
                    {' '}
                    <p>{completedOrder}</p>
                  </p>
                </div>
              </div>
              <div>
                <p className="my-booking-board-title">이용 전</p>
                <div className="board-list">
                  <div className="icon-box">
                    <FontAwesomeIcon icon={faCalendarXmark} />
                  </div>
                  <p>
                    {' '}
                    <p>{upcomingOrder}</p>
                  </p>
                </div>
              </div>
              <div>
                <p className="my-booking-board-title">이용 취소</p>
                <div className="board-list">
                  <div className="icon-box">
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                  </div>
                  <p>{cancleOrder}</p>
                </div>
              </div>
            </div>
            {paginatedBookings.map((x, i) => (
              <MyBooking key={i} x={x} />
            ))}
          </div>
          <Pagination
            current={currentBookingPage}
            pageSize={pageSize}
            total={userBooking.length}
            onChange={handleBookingPageChange}
            className="pagenation"
          />
        </>
      ),
    },
    {
      label: '리뷰내역',
      key: '3',
      children: (
        <>
          <div className="my-review">
            <p className="review-total">내가 쓴 리뷰{userReviews.length}개</p>
            <div className="review-list">
              {paginatedReviews.map((x, i) => (
                <ReviewList key={i} x={x} isDeletable={true} />
              ))}
            </div>
          </div>
          <Pagination
            current={currentBookingPage}
            pageSize={pageSize}
            total={userReviews.length}
            onChange={handleBookingPageChange}
            className="pagenation"
          />
        </>
      ),
    },
    {
      label: '찜',
      key: '4',
      children: (
        <>
          <div className="wish">
            {wishList.length > 0 ? (
              wishList.map((x, i) => {
                return (
                  <WishList
                    x={x}
                    key={i}
                    onRemove={() => deleteWishlistItem(x.id)}
                  />
                );
              })
            ) : (
              <p className="no-wish">찜 목록이 없습니다.</p>
            )}
          </div>
          <Pagination
            current={currentWishPage}
            pageSize={pageSize}
            total={wishList.length}
            onChange={handleWishPageChange}
            className="pagenation"
          />
        </>
      ),
    },
  ];

  return (
    <MyPageStyled>
      <Tabs tabPosition="left" items={tabItems} onChange={handleTabClick} />


    </MyPageStyled>
  );
};

export default MyPage;
