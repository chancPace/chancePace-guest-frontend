import React from "react"
import { CategoryStyled } from "./styled"
import { CardGridProps } from "antd/es/card"
interface CategoryProps {
    x:string;
}
const Category: React.FC<CategoryProps> = ({ x}) => {
    return(
    <CategoryStyled>
        {x}
    </CategoryStyled>)
}
export default Category