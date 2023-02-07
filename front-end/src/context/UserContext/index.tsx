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
import { IChildren } from "../../interfaces";

export const UserContext = createContext({});

export const useUser = () => { return useContext(UserContext) }

const UserProvider = ({ children }: IChildren) => {
    return(
        <UserContext.Provider value={''}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider