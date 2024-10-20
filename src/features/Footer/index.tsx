import { FooterStyled } from './styled';
import { useDispatch, UseDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Footer = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    //로그아웃 핸들러 함수
    const handleLogout = () => {
        Cookies.remove('token');
        dispatch(logout());
        router.push('/');
    };
    return (
        <FooterStyled>
            <p onClick={handleLogout}>로그아웃</p>
        </FooterStyled>
    );
};

export default Footer;
