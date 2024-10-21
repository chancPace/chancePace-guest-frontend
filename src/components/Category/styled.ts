import styled from 'styled-components';

export const CategoryStyled = styled.div`
    width: 100px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius};
    margin: 10px;
    background-color: lightgray;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
`;
