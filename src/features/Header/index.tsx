import { HeaderStyled } from './styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import MyProfile from '@/components/MyProfile';

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [istoggle, setIsToggle] = useState(false);

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
                onMouseEnter={() => setIsToggle(true)}
                onMouseLeave={() => setIsToggle(false)}
              >
                <p>
                  <span>
                    <FiUser className="headerIcon" />
                    {istoggle ? (
                      <div className="headerToggle">
                        <MyProfile />
                      </div>
                    ) : (
                      <></>
                    )}
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
