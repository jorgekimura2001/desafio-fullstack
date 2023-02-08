import { Container } from './style'
import { IoMdAdd } from 'react-icons/io'
import { useContact } from '../../context/ContactContext'
import CardContact from '../CardContact'
import { IModalAddProps } from '../../interfaces'

const Contacts = ({setModalAddContact}: IModalAddProps) => {

    const {contacts} = useContact()
       
    return (
        <Container>
            <div className='header-contact'>
                <h3>Contatos</h3>
                <button onClick={() => setModalAddContact(true)}><IoMdAdd/></button>
            </div>
            {
                contacts.map((contact) => (
                    <CardContact
                    key={contact.id}
                    id_contact={contact.id!}
                    email={contact.email}
                    full_name={contact.full_name}
                    telephone={contact.telephone}
                    />
                ))
            }
        </Container>
    )
}

export default Contacts