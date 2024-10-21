import { HostProcedureStyled } from './styled';
interface ProcedureProps {
    x: {
        title: string;
        text: string;
    };
}
const HostProcedure: React.FC<ProcedureProps> = ({ x}) => {
    return (
        <>
            <HostProcedureStyled  className="procedure">
                <p className="title">{x.title}</p>
                <p className="text">{x.text}</p>
            </HostProcedureStyled>
        </>
    );
};
export default HostProcedure;
