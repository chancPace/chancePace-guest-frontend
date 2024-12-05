import { Space } from '@/types';
import { TrendingSpotStyled } from './styled';
import { useRouter } from 'next/router';
interface TrendingSpotProps {
  x: Space;
}
const TrendingSpot = ({ x }: TrendingSpotProps) => {
  const sortedImages = x.images.sort((a, b) => a.id - b.id);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/spacedetail/${x.id}`);
  };
  return (
    <TrendingSpotStyled onClick={handleClick}>
      <img
        src={sortedImages[0]?.imageUrl}
        alt={sortedImages[0]?.imageUrl}
      ></img>
      <div className="trandingSpotText">
        <p>{x.spaceName}</p>
        <p>{x.spaceLocation}</p>
      </div>
    </TrendingSpotStyled>
  );
};
export default TrendingSpot;
