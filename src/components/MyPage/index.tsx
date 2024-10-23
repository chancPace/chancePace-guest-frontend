import { MyPageStyled } from './styled';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const MyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //로그아웃 핸들러 함수
  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(logout());
    router.push('/');
  };
  return (
    <MyPageStyled>
      <p onClick={handleLogout}>로그아웃</p>
      <p onClick={handleLogout}>로그아웃</p>
      <p onClick={handleLogout}>로그아웃</p>
      <p onClick={handleLogout}>로그아웃</p>
    </MyPageStyled>
  );
};
export default MyPage;
