import styled from 'styled-components';

export const ItemDetailStyled = styled.div`
    width: 95%;
    margin: auto;
    .spaceTitle {
        margin: 20px 0;
        > p {
            margin-bottom: 10px;
        }
    }
    .tabWrap {
        width: 60%;
        .tab {
            > p {
                margin-bottom: 10px;
            }
            .map {
                width: 100%;
                height: 250px;
                background-color: gray;
            }
        }
    }
`;
