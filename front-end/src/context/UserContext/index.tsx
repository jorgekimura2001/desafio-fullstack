import { api } from "../../services/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  IChildren,
  ILogin,
  IRegistration,
  IUser,
  IUserData,
  IUserUp,
} from "../../interfaces";
import { useContact } from "../ContactContext";

export const UserContext = createContext<IUserData>({} as IUserData);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: IChildren) => {
  const { setContacts } = useContact();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@userToken");
    const id = localStorage.getItem("@userId");
    const listUser = async () => {
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await api.get(`users/${id}`);
          setUser(data);
          setLoading(true);
          setContacts(data.contacts);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };
    listUser();

    const listAllUsers = async () => {
      setLoading(true);
      try {
        const usersResponse = await api.get(`users`);
        setLoading(false);
        setUsers(usersResponse.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Ops! Algo deu errado! Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    listAllUsers();
  }, []);

  console.log(users);

  const registration = async (data: IRegistration): Promise<void> => {
    await api
      .post("users", data)
      .then((res) => {
        toast.success("Conta criada com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ops! Algo deu errado! Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const login = async (data: ILogin): Promise<void> => {
    setLoading(true);
    await api
      .post("login", data)
      .then((res) => {
        localStorage.setItem("@userToken", res.data.token);
        localStorage.setItem("@userId", res.data.user.id);
        setUser(res.data.user);
        setContacts(res.data.user.contacts);
        setLoading(false);
        toast.success("Login realizado com sucesso", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Email e/ou senha incorreta. Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const logout = (): void => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleToProfilePage = (): void => {
    navigate("/profile", { replace: true });
  };

  const updateUser = async ({ id, data }: IUserUp): Promise<void> => {
    const token = localStorage.getItem("@userToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(true);
    try {
      const userUpdated = await api.patch(`users/${id}`, data);
      setLoading(false);
      toast.success("Usuário atualizado com sucesso!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const filter = users.filter((user) => user.id !== id);
      setUsers(() => [userUpdated.data, ...filter]);
      setUser(userUpdated.data)
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Ops! Algo deu errado! Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const removeUser = async (id: string): Promise<void> => {
    const token = localStorage.getItem("@userToken");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(true);
    try {
      await api.delete(`users/${id}`);
      setLoading(false);
      toast.success("Usuário excluído com sucesso!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const filter = users.filter((user) => user.id !== id);
      setUsers(filter);
      localStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Ops! Algo deu errado! Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        login,
        registration,
        user,
        loading,
        logout,
        handleToProfilePage,
        setLoading,
        updateUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
