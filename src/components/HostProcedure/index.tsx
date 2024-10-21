import { HostProcedureStyled } from './styled';
import { procedure } from '@/utill/datas';
import { GrNext } from 'react-icons/gr';
interface ProcedureProps {
    x: {
        title: string;
        text: string;
    };
    i: number;
}
const HostProcedure: React.FC<ProcedureProps> = ({ x, i }) => {
    return (
        <>
            <HostProcedureStyled key={i} className="procedure">
                <p className="title">{x.title}</p>
                <p className="text">{x.text}</p>
            </HostProcedureStyled>
            {i < procedure.length - 1 && <GrNext />}
        </>
    );
};
export default HostProcedure;
