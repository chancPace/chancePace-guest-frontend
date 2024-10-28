import React from 'react';
import { CategoryStyled } from './styled';
import { CategoryType } from '@/types';
interface CategoryProps {
    x: CategoryType;
}
const Category: React.FC<CategoryProps> = ({ x }) => {
    return (
        <CategoryStyled>
            {x.mainCategory}
            <div className="sub-category">
                {x.subCategories.map((subCategory, index) => (
                    <div key={index} className="sub-category-item">
                        {subCategory}
                    </div>
                ))}
            </div>
        </CategoryStyled>
    );
};
export default Category;
