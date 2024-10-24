import React from "react"
import { CategoryStyled } from "./styled"
import { CategoryType } from "@/types";
interface CategoryProps {
    x:CategoryType;
}
const Category: React.FC<CategoryProps> = ({ x}) => {
    return(
    <CategoryStyled>
        {x}
    </CategoryStyled>)
}
export default Category