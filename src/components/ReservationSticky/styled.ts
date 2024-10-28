import styled from 'styled-components';

export const ReservationStickyStyled = styled.div`
    height: 500px;
    background-color: aliceblue;
    text-align: center;
    padding: 10px;
    position: relative;
    .pay-button {
        padding: 10px;
        border: 0;
        position: absolute;
        top: 98%;
        left: 50%;
        transform: translate(-50%, -98%);
        cursor: pointer;
    }
`;
