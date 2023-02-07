import { api } from "../../services/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IChildren, ILogin, IRegistration, IUserData } from "../../interfaces";

export const UserContext = createContext<IUserData>({} as IUserData);

export const useUser = () => { return useContext(UserContext) }

const UserProvider = ({ children }: IChildren) => {

    const registration = async(data: IRegistration): Promise<void> => {
        await api
            .post('users', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    
    const login = async(data: ILogin): Promise<void> => {
        await api
            .post('login', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return(
        <UserContext.Provider value={{login, registration}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider