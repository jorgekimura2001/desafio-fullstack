import styled from "styled-components";

export const ContainerModal = styled.div`

    position: fixed;
    width: 100%;
    min-height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    inset: 0;

    background-color: rgba(0,0,0,.5);

    .modal-box{
        position: relative;
        display: flex;
        flex-direction: column;
       
        background-color: white;
        border-radius: 8px;
        width: 90%;
        margin: 0 auto;
        border-radius: 3.20867px;
        background-color: var(--color-grey-3);

        .header-modal{
            background-color: var(--color-grey-2);
            padding: 9px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 3.20867px 3.20867px 0px 0px;
           
            height: 40px;

            button{
                color: var(--color-grey-1);
                background-color: transparent;
                width: 8px;
                height: 20px;
            }

            h3{
                font-weight: 700;
                font-size: 11.2304px;
                line-height: 19px;

                color: var(--color-grey-0);
            }
        }

        form{
            margin-top: 20px;
            background: var(--color-grey-3);
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            label{
                color: var(--color-grey-0);
                font-weight: 400;
                font-size: 9px;
                margin-bottom: 13px;
                width: 90%;
            }
            input{
                background-color: var(--color-grey-2);
                color: var(--color-grey-0);
                width: 90%;
                height: 38.5px;
                font-weight: 400;
                font-size: 13.0293px;
                line-height: 21px;
                padding: 8px 0 8px 13px;
                border: 0.9772px solid var(--color-grey-0);
                border-radius: 3.20867px;
                outline: none;
            }
            input{
                margin-bottom: 10px;
            }
            
            input::placeholder{
                color: var(--color-grey-1);
                font-weight: 400;
                font-size: 14px;
            }

            input:focus{
                border: 1px solid var(--color-primary-focus);
            }

            button{
                display: flex;
                align-items: center;
                justify-content: center;

                background-color: var(--color-primary);
                color: var(--color-grey-0);

                padding: 0px 22.3336px;
                width: 90%;
                height: 30px;
                margin: 10px 0;

                border: 0.9772px solid var(--color-primary);
                border-radius: 4.06066px;

                font-weight: 500;
                font-size: 12.8347px;
                line-height: 21px;
            }

            p{
                line-height: 1;
                font-size: 10px;
                color: var(--color-primary-negative);
                margin-bottom: 8px;
            }
        }
        span{
            font-size: 12px;
            margin: 0 auto;
            margin-bottom: 10px;
            color: var(--color-grey-1);
            font-weight: 600;
            font-size: 9.5px;
        }
    }
`
