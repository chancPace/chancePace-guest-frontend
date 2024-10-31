import { MyProfileStyled } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store';

const MyProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  //로그아웃 핸들러 함수
  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(logout());
    router.replace('/');
  };
  return (
    <MyProfileStyled>
      <p className="user-id">{userInfo?.email}</p>
      <div className="profile-menu">
        <div className="grade">
          <div>등급 표시하기</div>
        </div>
        <div>프로필 관리</div>
        <div>예약 내역</div>
        <div>문의 내역</div>
        <div>리뷰 작성</div>
      </div>
      <p onClick={handleLogout} className="logout-btn">
        로그아웃
      </p>
    </MyProfileStyled>
  );
};
export default MyProfile;
