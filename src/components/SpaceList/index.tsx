// components/SpaceList.tsx
import { useEffect, useState } from 'react';
import { getSearchSpace, getSpace } from '@/pages/api/spaceApi';
import ItemList from '../ItemList';
import { SpaceListStyled } from './styled';
import { CategoryType, Space } from '@/types';
import { getCategory } from '@/pages/api/categoryApi';
import Category from '../Category';
import { Pagination } from 'antd';

interface SpaceListProps {
  type?: 'new' | 'popular' | 'recommended';
  categoryId?: number;
  query?: string;
}

const SpaceList = ({ type, query, categoryId }: SpaceListProps) => {
  const [subCategory, setSubCategory] = useState<CategoryType[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [filterSpace, setFilterSpace] = useState<Space[]>([]); // 필터링된 공간을 저장

  //공간 검색하기
  useEffect(() => {
    if (query) {
      const fetchSearchSpace = async () => {
        try {
          const data = await getSearchSpace(query);
          if (data?.data) {
            const availableSpaces = data.data.filter(
              (space: Space) => space.spaceStatus === 'AVAILABLE'
            );
            setSpaces(availableSpaces);
            setFilterSpace(availableSpaces);
          }
        } catch (error) {
          console.error('검색 데이터 로드 중 오류 발생:', error);
        }
      };
      fetchSearchSpace();
    }
  }, [query]);

  //카테고리 필터
  useEffect(() => {
    if (categoryId) {
      //해당하는 대분류의 서브카테고리 필터링
      //해당하는 대분류의 상품 필터링
      const fetchSubCategorySpace = async () => {
        try {
          const categoryData = await getCategory();
          const subCategory = categoryData.data.filter(
            (category: CategoryType) => Number(category.pId) === categoryId
          );
          setSubCategory(subCategory);
          const spaceData = await getSpace();
          const availableSpaces = spaceData.data.filter(
            (space: Space) =>
              space.spaceStatus === 'AVAILABLE' &&
              (space.categoryId === categoryId ||
                subCategory.some(
                  (sub: CategoryType) => sub.id === space.categoryId
                ))
          );
          setSpaces(availableSpaces);
          setFilterSpace(availableSpaces);
        } catch (error) {
          console.error('소분류 데이터 로드 중 오류 발생:', error);
        }
      };
      fetchSubCategorySpace();
    }
  }, [categoryId]);

  const handleSubCategoryClick = (subCategoryId: number) => {
    // 선택한 소분류 ID에 맞는 공간만 필터링
    if (subCategoryId === null) {
      setFilterSpace(spaces); // 모든 공간을 표시
    } else {
      setFilterSpace(
        spaces.filter((space) => space.categoryId === subCategoryId)
      );
    }
  };

  useEffect(() => {
    if (type && !query && !categoryId) {
      const fetchTypeSpace = async () => {
        try {
          const data = await getSpace();
          if (data?.data) {
            let filteredSpaces = data.data.filter(
              (space: Space) => space.spaceStatus === 'AVAILABLE'
            );
            if (type === 'new') {
              filteredSpaces = filteredSpaces.slice(0, 30);
            }
            // else if (type === 'popular') {
            //   filteredSpaces = filteredSpaces.filter(
            //     (space:Space) => space.isPopular
            //   );
            // } else if (type === 'recommended') {
            //   filteredSpaces = filteredSpaces.filter(
            //     (space:Space) => space.isRecommended
            //   );
            // }
            setSpaces(filteredSpaces);
            setFilterSpace(filteredSpaces);
          }
        } catch (error) {
          console.error('타입 데이터 로드 중 오류 발생:', error);
        }
      };
      fetchTypeSpace();
    }
  }, [type]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 프론트엔드 페이지당 데이터 개수

  const displayedSpaces = filterSpace.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <SpaceListStyled>
      <h1 className="title">{getTitle()}</h1>
      {subCategory.length > 0 && (
        <div className="subcategory-list">
          {subCategory.map((x, i) => (
            <Category
              key={i}
              x={x}
              onClick={() => handleSubCategoryClick(x.id)}
            />
          ))}
        </div>
      )}
      <div className="list">
        {displayedSpaces.map((space, i) => (
          <ItemList x={space} key={i} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={filterSpace.length}
        onChange={(page) => setCurrentPage(page)}
      />
    </SpaceListStyled>
  );
};

export default SpaceList;
