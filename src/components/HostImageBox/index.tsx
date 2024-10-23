import { HostInfoStyled } from './style';

interface HostInfoProps {
  x: {
    img?: { src?: string };
    title?: string;
    text?: string;
  };
}
const HostImageBox: React.FC<HostInfoProps> = ({ x }) => {
  return (
    <HostInfoStyled>
      {x.img ? (
        <>
          <img className="hostInfoImg" src={x.img.src} alt={x.img.src} />
          <p className="hostTitle">{x.title}</p>
          <p className="hostText">{x.text}</p>
        </>
      ) : (
        <div className="procedure">
          <p className="hostTitle procedureTitle ">{x.title}</p>
          <p className="hostText">{x.text}</p>
        </div>
      )}
    </HostInfoStyled>
  );
};
export default HostImageBox;
