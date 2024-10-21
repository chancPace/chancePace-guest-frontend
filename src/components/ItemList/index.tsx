import { ItemListStyled } from './styled';
import { space } from '@/utill/datas';
interface ItemListProps {
    x: {
        spaceName: string;
        spaceLocation: string;
        description: string;
        spacePrice: number;
        discount: number;
        amenities: string[];
        cleanTime: number;
        spaceStatus: string;
        isOpen: boolean;
        caution: string[];
        category: string;
        Minimum: number;
        Maximum: number;
        spaceImg: { src: string }[]; // 배열로 수정
    };
    isTrending?: boolean; // 새로운 prop 추가
}
const ItemList: React.FC<ItemListProps> = ({ x, isTrending }) => {
    return (
        <ItemListStyled isTrending={isTrending}>
            <div className="itemImg">
                <img
                    src={x.spaceImg[0].src}
                    alt={x.spaceName}
                    className="img"
                ></img>
            </div>
            <div className="itemText">
                <p>{x.spaceName}</p>
                <p>{x.spaceLocation}</p>
                <p>{x.spacePrice.toLocaleString()}</p>
            </div>
        </ItemListStyled>
    );
};
export default ItemList;
