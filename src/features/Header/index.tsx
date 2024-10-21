import { HeaderStyled } from './styled';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FiUser } from 'react-icons/fi';

const Header = () => {
    const { isLoggedIn } = useSelector(
        (state: RootState) => state.user
    );

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
                                <p className='hostMenuBar'>호스트 센터</p>
                            </Link>
                            <p>
                                <span>
                                    <FiUser />
                                </span>
                                MyPage
                            </p>
                        </>
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
