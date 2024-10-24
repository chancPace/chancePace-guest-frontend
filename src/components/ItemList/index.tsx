import { useRouter } from 'next/router';
import { ItemListStyled } from './styled';
import { Space } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'; // 아이콘 임포트
import { useState } from 'react';

interface ItemListProps {
    x: Space;
    isTrending?: boolean;
}
const ItemList: React.FC<ItemListProps> = ({ x, isTrending }) => {
    const router = useRouter();
    const [isBookmarked, setIsBookmarked] = useState(false);
console.log(isBookmarked,'북마크')
    const handleClick = () => {
        router.push(`/spacedetail/${x.id}`);
    };

    const toggleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation(); //부모 요소 클릭 방지
        setIsBookmarked(!isBookmarked);
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
            <div className="item-bottom">
                <div className="itemText">
                    <p>{x.spaceName}</p>
                    <p>{x.spaceLocation}</p>
                    <p>{x.spacePrice.toLocaleString()}</p>
                </div>
                <FontAwesomeIcon
                    icon={faBookmark}
                    className={`bookmark-icon ${isBookmarked ? 'active' : ''}`} 
                    onClick={toggleBookmark}
                />
            </div>
        </ItemListStyled>
    );
};
export default ItemList;
