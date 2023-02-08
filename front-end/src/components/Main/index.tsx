import ModalAddContact from "../ModalAddContact"
import { useUser } from "../../context/UserContext"
import { Container, ContainerContacts, ContainerNoneContacts, MainStyled } from "./style"
import { useContact } from "../../context/ContactContext"
import { useState } from "react"
import Contacts from "../Contacts"

const Main = () => {

    const {user} = useUser()
    const {contacts} = useContact()
    const [modalAddContact, setModalAddContact] = useState(false);

    return(
        <MainStyled>
            <Container>
                <p>Olá, {user.full_name}</p>
            </Container>
            <ContainerContacts>
                {
                    !contacts.length ?  
                    <ContainerNoneContacts>
                        <p>Que pena! Você não possui nenhum contato :(</p>
                        <span>Gostaria de adicionar?</span>
                        <button onClick={() => setModalAddContact(true)}>Clique me</button>
                    </ContainerNoneContacts>
                    :
                    <Contacts setModalAddContact={setModalAddContact}/>
                }
                {
                    modalAddContact && <ModalAddContact setModalAddContact={setModalAddContact}/>
                }
            </ContainerContacts>
        </MainStyled>
    )
}


export default Main