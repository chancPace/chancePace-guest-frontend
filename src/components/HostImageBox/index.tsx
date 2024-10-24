import { HostInfoStyled } from './style';

interface HostInfoProps {
  x: {
    img?: { src?: string };
    title?: string;
    text?: string;
    index?: string;
  };
}
const HostImageBox: React.FC<HostInfoProps> = ({ x }) => {
  return (
    <HostInfoStyled>
      {x.index ? (
        <div className="procedure">
          <p className="procedureTitle ">
            <img className="procedureImg" src={x?.img?.src} alt={x?.img?.src} />
            <span>{x.index}</span>
            {x.title}
          </p>
          <p className="procedureText">{x.text}</p>
        </div>
      ) : (
        <div>
          <img className="hostInfoImg" src={x?.img?.src} alt={x?.img?.src} />
          <p className="hostTitle">{x.title}</p>
          <p className="hostText">{x.text}</p>
        </div>
      )}
    </HostInfoStyled>
  );
};
export default HostImageBox;
