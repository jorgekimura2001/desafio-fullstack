import { useState } from "react";
import { IContactCardProps } from "../../interfaces";
import ModalEdit from "../ModalEditContact";
import { Container } from "./style";
import { BsPencilFill } from "react-icons/bs";

const CardContact = ({
  email,
  full_name,
  id_contact,
  telephone,
}: IContactCardProps) => {
  const [modalEdit, setModalEdit] = useState(false);

  return (
    <>
      <Container>
        <div className="contact-info">
          <p>{full_name}</p>
          <p>{email}</p>
          <p>{telephone}</p>
        </div>
        <button className="button__edit-contact" onClick={() => setModalEdit(true)}>
          <BsPencilFill />
        </button>
      </Container>
      {modalEdit && (
        <ModalEdit
          full_name={full_name}
          id_contact={id_contact}
          telephone={telephone}
          email={email}
          setModalEdit={setModalEdit}
        />
      )}
    </>
  );
};

export default CardContact;
