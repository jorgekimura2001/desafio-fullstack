import styled from "styled-components";

export const Container = styled.div`
    margin-top: 21px;
    padding: 12px;
    background: var(--color-grey-3);

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 4px;

    .contact-info{
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p:first-of-type{
            font-weight: 700;
            font-size: 14.2123px;
            line-height: 24px;
            color: var(--color-grey-0);
            width: 170px;
        }
        p ~ p {
            font-weight: 400;
            font-size: 12.182px;
            line-height: 22px;
            color: var(--color-grey-1);
        }
    }
    .button__edit-contact{
            width: 22px;
            height: 22px;
            background-color: transparent;
            color: var(--color-grey-0);
        }
`