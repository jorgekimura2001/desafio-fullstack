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

export const ContactContext = createContext({});

export const useContact = () => { return useContext(ContactContext) }

const ContactProvider = ({ children }: IChildren) => {
    return(
        <ContactContext.Provider value={''}>
            {children}
        </ContactContext.Provider>
    )
}

export default ContactProvider