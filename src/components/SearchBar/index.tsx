import { Button, Input } from 'antd';
import { SearchBarStyled } from './styled';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = async (value: string) => {
    router.push(`/search?query=${value}`); 
    setSearchTerm('');
  };

  return (
    <SearchBarStyled>
      <Input.Search
        placeholder="검색어를 입력해주세요"
        allowClear
        size="large"
        onSearch={onSearch}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="custom-InputSearch"
        enterButton={
          <Button
            type="primary"
            style={{
              backgroundColor: 'white',
              borderColor: 'white',
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        }
      />
    </SearchBarStyled>
  );
};
export default SearchBar;
