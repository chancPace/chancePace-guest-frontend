import { RootState } from '@/redux/store';
import { MainStyled } from './styled';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const MainPage = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <MainStyled>
            <div>메인페이지입니다</div>
        </MainStyled>
    );
};
export default MainPage;
