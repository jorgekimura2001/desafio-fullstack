import { IChildren } from "../interfaces"
import ContactProvider from "./ContactContext"
import UserProvider from "./UserContext"

const Providers = ({children}: IChildren) => {
    return(
        <ContactProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ContactProvider>
    )
}

export default Providers