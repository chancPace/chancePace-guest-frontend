import React from 'react';
import { CategoryStyled } from './styled';
import { CategoryType } from '@/types';
interface CategoryProps {
  x: CategoryType;
  onClick: () => void;
}
const Category = ({ x, onClick }: CategoryProps) => {
  return (
    <CategoryStyled onClick={onClick}>
      <p>{x.categoryName}</p>
    </CategoryStyled>
  );
};
export default Category;
