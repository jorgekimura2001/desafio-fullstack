import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import Main from "../../components/Main";
import { useUser } from "../../context/UserContext";
import { Container, ContainerLoad, } from "./style";

const Dashboard = () => {
 
  const { loading } = useUser();

  const token = localStorage.getItem('@userToken')

  return (
    <>
      {loading ? (
        <ContainerLoad>
          <span>Carregando ...</span>
        </ContainerLoad>
      ) : token ? (

        <>
        <Container>
                <Header/>
                <Main />
            </Container>
        </>
      ) : (
        <Navigate replace to="/login"/>
      )}
    </>
  );
};

export default Dashboard;
