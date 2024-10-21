import { HostInfoStyled } from './styled';
import { explanation } from '@/utill/datas';
interface HostInfoProps {
    x: {
        img: { src: string };
        title: string;
        text: string;
    };
    i: number;
}
const HostInfo: React.FC<HostInfoProps> = ({ x, i }) => {
    return (
        <HostInfoStyled key={i} className="info">
            <img className='hostInfoImg' src={x.img.src} alt={x.img.src} />
            <p className="hostTitle">{x.title}</p>
            <p className="hostText">{x.text}</p>
        </HostInfoStyled>
    );
};
export default HostInfo;
