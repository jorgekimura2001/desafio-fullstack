import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import { Container, ContainerForm } from "./style"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import { IRegistration } from "../../interfaces"

const Profile = () => {

    const {user, loading, updateUser, removeUser} = useUser()

    const navigate = useNavigate()

    const formSchema = yup.object({
        full_name: yup.string(),
        telephone: yup.string(),
        email: yup.string().email("Email inválido"),
        password: yup.string(),
      });
    
    const {register,handleSubmit,formState: { errors },} = useForm<IRegistration>({
        resolver: yupResolver(formSchema),
      });
    
      function onSubmit(data: IRegistration) {
        updateUser({id: user.id, data});
      }

    return(
        <>
        <Container>
            <div>
                <button className='btn-handle-back-page' onClick={() => navigate('/dashboard', {replace: true})}>Voltar</button>
            </div>
            <ContainerForm>
                <div>
                    <span>Editar / Excluir sua conta</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="full_name">Nome Completo</label>
                    <input
                    type="text"
                    id="full_name"
                    placeholder={user.full_name}
                    {...register("full_name")}
                    />
                    <p>{errors.full_name?.message}</p>

                    <label htmlFor="telephone">Telefone</label>
                    <input 
                    type="text" 
                    id='telephone'
                    placeholder={user.telephone}
                    {...register('telephone')}
                    />
                    <p>{errors.telephone?.message}</p>

                    <label htmlFor="email">Email</label>
                    <input
                    type="text"
                    id="email"
                    placeholder={user.email}
                    {...register("email")}
                    />
                    <p>{errors.email?.message}</p>


                    <label htmlFor="password">Senha</label>
                    
                    <input type='text' id="password" placeholder={"Altere sua senha"} {...register("password")}/>
                    <p>{errors.password?.message}</p>

                    <button type='submit'>Editar</button>
                </form>
                <button
                    className="button__remove-user"
                    onClick={() => removeUser(user.id)}>
          Excluir
        </button>
                {
                    loading && <span>Carregando ...</span>
                }
            </ContainerForm>
        </Container>
        </>
    )
}

export default Profile