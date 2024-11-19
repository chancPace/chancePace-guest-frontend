import { useEffect, useState } from 'react';
import { getSearchSpace, getSpace } from '@/pages/api/spaceApi';
import ItemList from '../ItemList';
import { SpaceListStyled } from './styled';
import { CategoryType, Space } from '@/types';
import { getCategory } from '@/pages/api/categoryApi';
import Category from '../Category';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';

const SpaceList = () => {
  const router = useRouter();
  const { type, query, categoryId } = router.query;
  const [subCategory, setSubCategory] = useState<CategoryType[]>([]);
  const [space, setSpace] = useState<Space[]>([]);
  const [filterSpace, setFilterSpace] = useState<Space[]>([]);


  const isAvailableSpace = (space: Space) => {
    return space.spaceStatus === 'AVAILABLE' && space.isOpen === true;
  };

  //공간 검색
  useEffect(() => {
    if (query) {
      const fetchSearchSpace = async () => {
        try {
          const data = await getSearchSpace(query as string);
          if (data?.data) {
            const availableSpace = data.data.filter(isAvailableSpace);
            setSpace(availableSpace);
            setFilterSpace(availableSpace);
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
          const subCategoryList = categoryData.data.filter(
            (category: CategoryType) => Number(category.pId) === Number(categoryId)
          );
          setSubCategory([
            { id: null, categoryName: '전체' },
            ...subCategoryList,
          ]);
          const spaceData = await getSpace();
          const availableSpace = spaceData.data.filter(
            (space: Space) =>
              isAvailableSpace(space) &&
              (space.categoryId === Number(categoryId) ||
                subCategoryList.some(
                  (sub: CategoryType) => sub.id === space.categoryId
                ))
          );
          setSpace(availableSpace);
          setFilterSpace(availableSpace);
        } catch (error) {
          console.error('소분류 데이터 로드 중 오류 발생:', error);
        }
      };
      if (categoryId) {
        fetchSubCategorySpace();
      }
    }
  }, [categoryId]);

  const handleSubCategoryClick = (subCategoryId: number | null) => {
    // 선택한 소분류 ID에 맞는 공간만 필터링
    if (subCategoryId === null) {
      setFilterSpace(space);
    } else {
      setFilterSpace(
        space.filter((space) => space.categoryId === subCategoryId)
      );
    }
  };

  //타입별 상품 보여주기
  useEffect(() => {
    if (type && !query && !categoryId) {
      const fetchTypeSpace = async () => {
        try {
          const data = await getSpace();
          if (data?.data) {
            let filteredSpace = data.data.filter(isAvailableSpace);
            if (type === 'new') {
              filteredSpace = filteredSpace.slice(0, 30);
            } else if (type === 'popular') {
              filteredSpace = filteredSpace
                .sort(
                  (a: Space, b: Space) =>
                    (b.bookings?.length || 0) - (a.bookings?.length || 0)
                )
                .slice(0, 30);
            } else if (type === 'recommended') {
              filteredSpace = filteredSpace
                .sort(() => Math.random() - 0.5)
                .slice(0, 30);
            }
            setSpace(filteredSpace);
            setFilterSpace(filteredSpace);
          }
        } catch (error) {
          console.error('오류 발생:', error);
        }
      };
      fetchTypeSpace();
    }
  }, [type]);

  const getTitle = () => {
    if (query) {
      return <div className="search-title">"{query}" 검색 결과</div>;
    }
    switch (type) {
      case 'new':
        return (
          <div className="type-title">
            새로운 장소<span>이번 달 새로운 공간을 만나보세요</span>
          </div>
        );
      case 'popular':
        return (
          <div className="type-title">
            인기 장소<span></span>
          </div>
        );
      case 'recommended':
        return (
          <div className="type-title">
            추천 장소<span>찬스페이스가 추천해주는 이곳!</span>
          </div>
        );
    }
  };

  //페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        {displayedSpaces.length > 0 ? (
          displayedSpaces.map((space, i) => <ItemList x={space} key={i} />)
        ) : (
          <p className="no-item">상품이 없습니다</p>
        )}
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
