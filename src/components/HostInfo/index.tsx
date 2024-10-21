import { HostInfoStyled } from './styled';

interface HostInfoProps {
    x: {
        img: { src: string };
        title: string;
        text: string;
    };
}
const HostInfo: React.FC<HostInfoProps> = ({ x }) => {
    return (
        <HostInfoStyled className="info">
            <img className='hostInfoImg' src={x.img.src} alt={x.img.src} />
            <p className="hostTitle">{x.title}</p>
            <p className="hostText">{x.text}</p>
        </HostInfoStyled>
    );
};
export default HostInfo;
