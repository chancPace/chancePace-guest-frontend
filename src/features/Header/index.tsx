import { HeaderStyled } from './styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FiUser } from 'react-icons/fi';

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const userRole = useSelector((state: RootState) => state.user.userInfo?.role);
  if (window.location.pathname === '/login') return null;
  if (window.location.pathname === '/signup') return null;

  return (
    <HeaderStyled>
      <nav>
        <Link href="/" passHref>
          <span className="logo">ChancePace</span>
        </Link>

        <div className="userBar">
          {isLoggedIn ? (
            <div className="headerRight">
              <div className="host">
                {' '}
                <Link href={'/host'}>
                  <p className="hostMenuBar">호스트 센터</p>
                </Link>
                {userRole === 'HOST' ? (
                  <Link href="http://43.202.44.75:3001">
                    <p className="hostMenuBar">내 공간</p>
                  </Link>
                ) : (
                  ''
                )}
              </div>

              <Link href="/mypage">
                <p className="header-icon">
                  <span>
                    <FiUser className="icon" />
                  </span>
                </p>
              </Link>
            </div>
          ) : (
            <div className="headerRight">
              <Link href="/host">
                <p className="hostMenuBar">호스트 센터</p>
              </Link>
              <Link href="/login" passHref>
                <p>로그인</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </HeaderStyled>
  );
};
export default Header;
