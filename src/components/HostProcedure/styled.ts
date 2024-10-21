import styled from 'styled-components';

export const HostProcedureStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .procedure {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
            padding: 20px 10px;
            width: 300px;
            height: 200px;
            background-color: lightgray;
            border-radius: ${({ theme }) => theme.borderRadius};
            margin: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .title {
                margin-bottom: 20px;
            }
        }
    }
`;
