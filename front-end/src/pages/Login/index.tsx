import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { ILogin } from "../../interfaces"
import { Container, ContainerLogin, ContainerRegister } from "./style"
import { useState } from "react"
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx'
import { useUser } from "../../context/UserContext"

const Login = () => {

    const [isClick, setIsClick] = useState(false)

    const {login, loading} = useUser()

    const navigate = useNavigate()

    const formSchema = yup.object({
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
        password: yup.string().required('Senha é obrigatória')
    })

    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>({
        resolver: yupResolver(formSchema)
    })

    function onSubmit(data: ILogin){
        login(data)
    }

    return(
        <Container>
            <ContainerLogin>
                <span>Login</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="Email" {...register('email')}/>
                    <p>{errors.email?.message}</p>
                    <label htmlFor="password">Senha</label>
                    <div className="password-container">
                        <input type={isClick ? 'text' : 'password'} id="password" placeholder="Senha" {...register('password')}/>
                        <button type="button" className='btn-showpassword' onClick={() => 
                            setIsClick(!isClick)}>{isClick ? <RxEyeClosed/> : <RxEyeOpen/>}</button>
                    </div>
                    <p>{errors.password?.message}</p>
                    <button type="submit">Entrar</button>
                </form>
                {
                    loading && <span>Carregando ...</span>
                }
                <ContainerRegister>
                    <span>Ainda não possui uma conta?</span>
                    <button onClick={() => navigate('/registration', {replace: true})}>Cadastre-se</button>
                </ContainerRegister>
            </ContainerLogin>
        </Container>
    )
}

export default Login