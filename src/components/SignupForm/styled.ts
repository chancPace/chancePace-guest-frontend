import styled from 'styled-components';

export const SignupFormStyled = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    .form {
        border: 1px solid gray;
        border-radius: ${({ theme }) => theme.borderRadius};
        width: 400px;
        margin: auto;
        padding: 50px;
        background-color: white;
        .customInput {
            width: 300px;
        }
    }
    .formLogo {
        position: absolute;
        bottom:80%;
        left: 50%;
        transform: translate(-80%,-50%);
        font-size: ${({ theme }) => theme.fontSizes.xl};
    }
`;
