import { useRouter } from 'next/router';
import { ItemListStyled } from './styled';
import { Space } from '@/types';
interface ItemListProps {
    x: Space;
    isTrending?: boolean; // 새로운 prop 추가
}
const ItemList: React.FC<ItemListProps> = ({ x, isTrending }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/spacedetail/${x.id}`);
    };
    return (
        <ItemListStyled isTrending={isTrending} onClick={handleClick}>
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
