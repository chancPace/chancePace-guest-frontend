import Link from 'next/link';
import { BannerStyled } from './styled';

interface BannerProps {
  x: {
    img: string;
    link: string;
  };
}
const Banner = ({ x }: BannerProps) => {
  return (
    <BannerStyled>
      <Link href={x.link} target="_blank">
        <img src={x.img}></img>
      </Link>
    </BannerStyled>
  );
};
export default Banner;
