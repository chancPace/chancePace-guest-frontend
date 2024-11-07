import styled from 'styled-components';

export const ButtonsStyled = styled.div`
    margin-top: 50px;
    .customButton {
        width: 350px;
        background-color: ${({ theme }) => theme.color.main};
        &:hover {
            background-color: gray;
        }
    }
`;
