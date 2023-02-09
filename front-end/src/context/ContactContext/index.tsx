import { api } from "../../services/api";
import {
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IChildren, IContact, IContactCreate, IContactData, IContactUp } from "../../interfaces";

export const ContactContext = createContext<IContactData>({} as IContactData);

export const useContact = () => { return useContext(ContactContext) }

const ContactProvider = ({ children }: IChildren) => {

    const [contacts, setContacts] = useState<IContact[]>([])
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('@userToken')

    const addContact = async(data: IContactCreate): Promise<void> => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setLoading(true)
        try {
            const contactAdded = await api.post('contacts', data)
            setLoading(false)
            toast.success('Contato adicionado com sucesso!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setContacts(oldContacts => [...oldContacts, contactAdded.data])
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Ops! Algo deu errado! Tente novamente.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    const updateContact = async({id, data}: IContactUp): Promise<void> => {
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setLoading(true)
        try {
            const contactUpdated = await api.patch(`contacts/${id}`, data)
            setLoading(false)
            toast.success('Contato atualizado com sucesso!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const filter = contacts.filter(contact => contact.id !== id)
            setContacts(() => [contactUpdated.data, ...filter])
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Ops! Algo deu errado! Tente novamente.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const removeContact = async(id:string): Promise<void> => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setLoading(true)
        try {
            await api.delete(`contacts/${id}`)
            setLoading(false)
            toast.success('Contato excluído com sucesso!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const filter = contacts.filter(contact => contact.id !== id)
            setContacts(filter)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Ops! Algo deu errado! Tente novamente.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    return(
        <ContactContext.Provider value={{contacts, setContacts, addContact, loading, updateContact, removeContact}}>
            {children}
        </ContactContext.Provider>
    )
}

export default ContactProvider