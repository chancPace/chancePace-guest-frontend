import { HeaderStyled } from './styled';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FiUser } from 'react-icons/fi';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { logout } from '@/redux/slices/userSlice';

const Header = () => {
  // const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const userRole = useSelector((state: RootState) => state.user.userInfo?.role);



  return (
    <HeaderStyled>
      <nav>
        <Link href="/" passHref>
          <span className="logo">ChancePace</span>
        </Link>

        <div className="userBar">
          {isLoggedIn ? (
            <>
              <Link
                href={userRole === 'HOST' ? 'http://localhost:3001/' : '/host'}
              >
                <p className="hostMenuBar">호스트 센터</p>
              </Link>
              <Link href="/mypage">
                <p className="header-icon">
                  <span>
                    <FiUser className="icon" />
                  </span>
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/host">
                <p className="hostMenuBar">호스트 센터</p>
              </Link>
              <Link href="/login" passHref>
                <p>로그인</p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </HeaderStyled>
  );
};
export default Header;
