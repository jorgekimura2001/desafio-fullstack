import styled from "styled-components";

export const HeaderStyled = styled.header`
    padding: 0 13px;
    align-items: center;
    height: 73px;
    width: 100%;
    display: flex;
    justify-content: end;

    button{
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--color-grey-2);
        color: var(--color-grey-0);

        font-weight: 600;
        font-size: 12px;
        line-height: 28px;

        height: 40px;
        width: auto;
        padding: 6px 16px;

        border-radius: 4px;
    }
    button:first-of-type{
        margin-right: 10px;
    }
    button:hover{
        background-color: var(--color-grey-3);
    }
    @media (min-width: 1024px) {
        /* justify-content: space-between; */
        padding: 0 150px;
    }
`