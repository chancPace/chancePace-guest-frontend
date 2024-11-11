import { HeaderStyled } from './styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FiUser } from 'react-icons/fi';


const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <HeaderStyled>
      <nav>
        <Link href="/" passHref>
          <span className="logo">ChancePace</span>
        </Link>

        <div className="userBar">
          {isLoggedIn ? (
            <>
              <Link href="/host">
                <p className="hostMenuBar">호스트 센터</p>
              </Link>
              <Link
                href="/mypage"
              >
                <p className='header-icon'>
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
