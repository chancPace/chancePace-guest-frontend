import { Button, Input } from 'antd';
import { SearchBarStyled } from './styled';
import { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearched, setIsSearched] = useState(false); // 검색 상태 관리

    const onSearch = (value: string) => {
        console.log(value);
        setSearchTerm(''); // 검색 후 입력창 비우기
        setIsSearched(true); // 검색 완료 상태 변경
    };

    return (
        <SearchBarStyled>
            <Input.Search
                placeholder="검색어를 입력해주세요"
                allowClear
                // enterButton="검색"
                size="middle"
                onSearch={onSearch}
                value={searchTerm} // state 값에 따라 값 설정
                onChange={(e) => setSearchTerm(e.target.value)}
                className="custom-InputSearch"
                enterButton={
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'gray',
                            borderColor: 'gray',
                        }}
                    >
                        검색
                    </Button>
                } // 커스텀 버튼 전달
            />
        </SearchBarStyled>
    );
};
export default SearchBar;
