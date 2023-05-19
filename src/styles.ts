import styled from "styled-components";

export const Box = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    height: 100vh;
    width: 100%;
 

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 0.5rem;

        width: 50vw;
        height: 50vh;
    }

    button{
        background: green;
        color: white;

        cursor: pointer;
    }

`