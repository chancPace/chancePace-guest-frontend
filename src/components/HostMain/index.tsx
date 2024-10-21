import { hostMainImg } from '@/utill/datas';
import { HostMainStyled } from './styled';

const HostMain = () => {
    const text = 'Share Your Space';
    return (
        <HostMainStyled>
            <div className="mainImg">
                {hostMainImg?.map((x, i) => {
                    return <img key={i} src={x.src} alt={x.src}></img>;
                })}
                <p className="mainTitle">
                    {text.split('').map((char, index) => (
                        <span
                            key={index}
                            style={{ '--i': index } as React.CSSProperties} // CSSProperties로 명시
                        >
                            {char}
                        </span>
                    ))}
                </p>
            </div>
        </HostMainStyled>
    );
};
export default HostMain;
