import { HostInfoStyled } from './styled';
import { explanation } from '@/utill/datas';

const HostInfo = () => {
    return (
        <HostInfoStyled>
            <div className="info">
                {explanation?.map((x, i) => {
                    return (
                        <div key={i}>
                            <img src={x.img.src} alt={x.img.src}></img>
                            <p className='hostTitle'>{x.title}</p>
                            <p className='hostText'>{x.text}</p>
                        </div>
                    );
                })}
            </div>
        </HostInfoStyled>
    );
};
export default HostInfo;
