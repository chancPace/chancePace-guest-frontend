import { HostInfoStyled } from './styled';

interface HostInfoProps {
  x: {
    img?: { src?: string };
    title?: string;
    text?: string;
    index?: string;
  };
}
const HostImageBox = ({ x }: HostInfoProps) => {
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
        <div className="hostSection">
          <img className="hostInfoImg" src={x?.img?.src} alt={x?.img?.src} />
          <div className="host-text">
            <p className="hostTitle">{x.title}</p>
            <p className="hostText">{x.text}</p>
          </div>
        </div>
      )}
    </HostInfoStyled>
  );
};
export default HostImageBox;
