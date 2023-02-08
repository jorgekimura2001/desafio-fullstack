import { useContact } from "../../context/ContactContext"
import { IContact, IContactCreate, IModalAddProps } from "../../interfaces"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import { useEffect, useRef } from "react";
import { ContainerModal } from "./style";
import { AiOutlineClose } from "react-icons/ai";


const ModalAddContact = ({setModalAddContact}: IModalAddProps) => {

    const {addContact, loading} = useContact()

    const formSchema = yup.object({
        full_name: yup.string().required("Nome é obrigatório"),
        telephone: yup.string().required('Telefone é obrigatório')
        .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/, 'Número de telefone inválido'
        ),
        email: yup.string().required("Email é obrigatório").email("Email inválido"),
      })
    
      const { register, handleSubmit, formState: {errors} } = useForm<IContactCreate>({
        resolver: yupResolver(formSchema)
      });
    
      const modalRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        function handleOutClick(event: MouseEvent) {
            if (!modalRef.current?.contains(event.target as HTMLDivElement)) {
                setModalAddContact(false);
            }
        }
        document.addEventListener("mousedown", handleOutClick);
        return () => {
          document.removeEventListener("mousedown", handleOutClick);
        };
    }, []);

    const onSubmit = (data: IContactCreate) => {
        addContact(data)
        setTimeout(() => {
            setModalAddContact(false)
        }, 2000);
      }

    return (
        <ContainerModal>
            <div className="modal-box" ref={modalRef}>
                <div className="header-modal">
                <h3>Cadastrar Contato</h3>
                <button onClick={() => setModalAddContact(false)}>
                    <AiOutlineClose />
                </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="full_name-contact">Nome Completo do Contato</label>
                    <input
                        type="text"
                        id="full_name-contact"
                        placeholder="Digite o nome completo do contato"
                        {...register("full_name")}
                    />
                    <p>{errors.full_name?.message}</p>

                    <label htmlFor="telephone-contact">Telefone do Contato</label>
                    <input 
                    type="text" 
                    id='telephone-contact'
                    placeholder='Digite o telefone (celular) do contato'
                    {...register('telephone')}
                    />
                    <p>{errors.telephone?.message}</p>

                    <label htmlFor="email-contact">Email do Contato</label>
                    <input
                    type="text"
                    id="email-contact"
                    placeholder="Digite o email do contato"
                    {...register("email")}
                    />
                    <p>{errors.email?.message}</p>

                    <button type="submit">Adicionar contato</button>

                </form>
                {
                loading && <span>Carregando ...</span>
                }
            </div>
        </ContainerModal>
    )
}

export default ModalAddContact