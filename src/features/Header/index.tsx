import { HeaderStyled } from './styled';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Header = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector(
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
                                <span>호스트 등록</span>
                            </Link>
                            <Link href="/mypage" passHref>
                                <span>마이페이지</span>
                            </Link>
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
