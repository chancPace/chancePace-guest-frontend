import { HostProcedureStyled } from './styled';
import { procedure } from '@/utill/datas';
import { GrNext } from 'react-icons/gr';

const HostProcedure = () => {
    return (
        <HostProcedureStyled>
            {procedure?.map((x, i) => {
                return (
                    <div className="procedure">
                        <div key={i}>
                            <p className="title">{x.title}</p>
                            <p className="text">{x.text}</p>
                        </div>
                        {i < procedure.length - 1 && <GrNext />}
                    </div>
                );
            })}
        </HostProcedureStyled>
    );
};
export default HostProcedure;
