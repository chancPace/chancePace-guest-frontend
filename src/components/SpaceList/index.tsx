// components/SpaceList.tsx
import { useEffect, useState } from 'react';
import { getSearchSpace, getSpace } from '@/pages/api/spaceApi';
import ItemList from '../ItemList';
import { SpaceListStyled } from './styled';
import { Space } from '@/types';

interface SpaceListProps {
  type?: 'new' | 'popular' | 'recommended';
  query?: string;
}

const SpaceList = ({ type, query }: SpaceListProps) => {
  const [spaces, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    const fetchSpace = async () => {
      let data;
      if (query) {
        data = await getSearchSpace(query);
        console.log(data, '데이터데이터');
      } else {
        data = await getSpace();
      }
      if (data?.data) {
        let filterSpace;
        if (type === 'new') {
          filterSpace = data.data.slice(0, 30); // 새로운 장소 상위 8개
        }
        setSpaces(filterSpace || data.data);
        // console.log(spaces, '스페이시스');
        // else if (type === 'popular') {
        //   filteredSpaces = spaceData.data.filter(
        //     (space: Space) => space.isPopular
        //   ); // 인기 장소 필터링
        // } else if (type === 'recommended') {
        //   filteredSpaces = spaceData.data.filter(
        //     (space: Space) => space.isRecommended
        //   ); // 추천 장소 필터링
        // }
      }
    };
    fetchSpace();
  }, [type, query]);

  const getTitle = () => {
    if (query) {
      return `"${query}" 검색 결과`;
    }
    switch (type) {
      case 'new':
        return '새로운 장소';
      case 'popular':
        return '인기 장소';
      case 'recommended':
        return '추천 장소';
    }
  };

  return (
    <SpaceListStyled>
      <h1 className="title">{getTitle()}</h1>
      <div className="list">
        {spaces.map((space, i) => (
          <ItemList x={space} key={i} />
        ))}
      </div>
    </SpaceListStyled>
  );
};

export default SpaceList;
