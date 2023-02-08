import { useUser } from '../../context/UserContext';
import { HeaderStyled } from './style'

const Header = () => {

    const {logout, handleToProfilePage} = useUser()

    return (
        <HeaderStyled>
            <button onClick={handleToProfilePage}>Minha conta</button>
            <button onClick={logout}>Sair</button>
        </HeaderStyled>
    )
}

export default Header