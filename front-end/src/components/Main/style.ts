import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 131px;
    padding-left: 12px;

    border-top: 1px solid var(--color-grey-3);
    border-bottom: 1px solid var(--color-grey-3);

    display: flex;
    flex-direction: column;
    justify-content: center;

    p{
        color: var(--color-grey-0);
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 10px;
    }
    span{
        color: var(--color-grey-1);
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
    }
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 150px;

        p{
            margin-bottom: 0;
        }
    }
`

export const ContainerContacts = styled.div`
    display: flex;

    p{
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        color: var(--color-grey-0);
    }

    span{
        margin-top: 23px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--color-grey-0);
    }

    @media (min-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding: 0 150px;
        margin-top: 37px;

    }
`

export const ContainerNoneContacts = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 13px;

    span{
        margin-top: 16px;
        margin-bottom: 16px;
    }
    button{
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--color-primary);
        color: var(--color-grey-0);

        padding: 0px 22.3336px;
        width: 100%;
        height: 35.5px;

        border: 0.9772px solid var(--color-primary);
        border-radius: 4.06066px;

        font-weight: 500;
        font-size: 12.8347px;
        line-height: 21px;
    }
    @media (min-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding: 0 150px;
        margin-top: 37px;
    }
`

export const MainStyled = styled.main`
    width: 100%;
    /* height: 100vh; */
    background-color: var(--color-grey-4);

    @media (min-width: 1024px){
        height: initial;
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
`
