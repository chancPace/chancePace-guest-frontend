import { Space } from '@/types';
import { TrendingSpotStyled } from './styled';
import { useRouter } from 'next/router';
interface TrendingSpotProps {
    x: Space;
}
const TrendingSpot: React.FC<TrendingSpotProps> = ({ x }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/spacedetail/${x.id}`);
    };
    return (
        <TrendingSpotStyled onClick={handleClick}>
            <img src={x.spaceImg[0].src} alt={x.spaceImg[0].src}></img>
            <div className='trandingSpotText'>
                <p>{x.spaceName}</p>
                <p>{x.spaceLocation}</p>
            </div>
        </TrendingSpotStyled>
    );
};
export default TrendingSpot;
