import { RootState } from '@/redux/store';
import { MainStyled } from './styled';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ItemList from '@/components/ItemList';

const MainPage = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <MainStyled>
            <div className='searchbarBg'>
                <SearchBar />
            </div>
            <ItemList></ItemList>
        </MainStyled>
    );
};
export default MainPage;
