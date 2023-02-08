import { ContainerModalEdit } from "./style";
import { useContact } from "../../context/ContactContext";
import { useEffect, useRef, } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IContactCreate, IModalEditProps } from "../../interfaces";

const ModalEdit = ({
  full_name,
  email,
  id_contact,
  telephone,
  setModalEdit,
}: IModalEditProps) => {


  const { updateContact, removeContact, loading } = useContact();

  const formSchema = yup.object({
    full_name: yup.string(),
    telephone: yup.string(),
    email: yup.string().email("Email inválido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactCreate>({
    resolver: yupResolver(formSchema),
  });

  const modalEditRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutClick(event: MouseEvent) {
      if (!modalEditRef.current?.contains(event.target as HTMLDivElement)) {
        setModalEdit(false);
      }
    }
    document.addEventListener("mousedown", handleOutClick);
    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  function onSubmit(data: IContactCreate) {
    updateContact({ id: id_contact, data });
    setTimeout(() => {
      setModalEdit(false);
    }, 2000);
  }

  return (
    <ContainerModalEdit>
      <div className="modal-box" ref={modalEditRef}>
        <div className="header-modal">
          <h3>Editar / Excluir Contato</h3>
          <button onClick={() => setModalEdit(false)}>
            <AiOutlineClose />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="full_name-contact">Nome Completo do Contato</label>
          <input
            type="text"
            id="full_name-contact"
            placeholder={full_name}
            {...register("full_name")}
          />
          <p>{errors.full_name?.message}</p>

          <label htmlFor="telephone-contact">Telefone do Contato</label>
          <input
            type="text"
            id="telephone-contact"
            placeholder={telephone}
            {...register("telephone")}
          />
          <p>{errors.telephone?.message}</p>

          <label htmlFor="email-contact">Email do Contato</label>
          <input
            type="text"
            id="email-contact"
            placeholder={email}
            {...register("email")}
          />
          <p>{errors.email?.message}</p>

          <button type="submit">Atualizar Contato</button>
        </form>
        <button
          className="button__remove-contact"
          onClick={() => removeContact(id_contact)}
        >
          Excluir
        </button>
        {loading && <span className="uptade__load">Carregando ...</span>}
      </div>
    </ContainerModalEdit>
  );
};

export default ModalEdit;
