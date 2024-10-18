import { HeaderStyled } from './styled';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isLoginStatus, setIsLoginStatus] = useState(false);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoginStatus(true);
        }
    }, []);

    return (
        <HeaderStyled>
            <nav>
                <Link href="/" passHref>
                    <span className="logo">ChancePace</span>
                </Link>

                <div className="userBar">
                    {isLoginStatus ? (
                        <Link href="/mypage" passHref>
                            <span>마이페이지</span>
                        </Link>
                    ) : (
                        <Link href="/login" passHref>
                            <span>로그인</span>
                        </Link>
                    )}
                </div>
            </nav>
        </HeaderStyled>
    );
};
export default Header;
