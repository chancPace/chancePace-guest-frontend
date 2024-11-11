import { BannerStyled } from './styled';

interface BannerProps {
  x: {
    img: string;
  };
}
const Banner = ({ x }: BannerProps) => {
  return (
    <BannerStyled>
      <img src={x.img}></img>
    </BannerStyled>
  );
};
export default Banner;
