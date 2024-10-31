// components/SpaceList.tsx
import { useEffect, useState } from 'react';
import { getSpace } from '@/pages/api/spaceApi';
import ItemList from '../ItemList';
import { SpaceListStyled } from './styled';
import { Space } from '@/types';

interface SpaceListProps {
  type: 'new' | 'popular' | 'recommended';
}

const SpaceList: React.FC<SpaceListProps> = ({ type }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    const fetchSpace = async () => {
      const spaceData = await getSpace();
      if (spaceData?.data && spaceData.data.length > 0) {
        let filteredSpaces;

        // type에 따라 데이터를 필터링 또는 슬라이싱
        if (type === 'new') {
          filteredSpaces = spaceData.data.slice(0, 30); // 새로운 장소 상위 8개
        }
        // else if (type === 'popular') {
        //   filteredSpaces = spaceData.data.filter(
        //     (space: Space) => space.isPopular
        //   ); // 인기 장소 필터링
        // } else if (type === 'recommended') {
        //   filteredSpaces = spaceData.data.filter(
        //     (space: Space) => space.isRecommended
        //   ); // 추천 장소 필터링
        // }

        setSpaces(filteredSpaces || []);
      }
    };

    fetchSpace();
  }, [type]);

  const getTitle = () => {
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
      <h1 className="title">{getTitle()}</h1> {/* 타입에 따라 타이틀 표시 */}
      <div className="list">
        {spaces.map((space, i) => (
          <ItemList x={space} key={i} />
        ))}
      </div>
    </SpaceListStyled>
  );
};

export default SpaceList;
