import * as yup from 'yup'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import { IRegistration } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx'
import { useUser } from '../../context/UserContext';

const Registration = () => {

    const [isClick, setIsClick] = useState(false)

    const navigate = useNavigate()

    const {registration} = useUser()

    const formSchema = yup.object({
        full_name: yup.string().required("Nome é obrigatório"),
        telephone: yup.string().required('Telefone é obrigatório')
        .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/, 'Número de telefone inválido'
        ),
        email: yup.string().required("Email é obrigatório").email("Email inválido"),
        password: yup
          .string()
          .required("Senha é obrigatória")
          .matches(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/, 'Deve conter uma letra maiscúla, uma letra minúscula, 1 caracter especial, um número, no mínimo 6 caracteres e no máximo 15 caracteres'),
      });
    
    const {register,handleSubmit,formState: { errors },} = useForm<IRegistration>({
        resolver: yupResolver(formSchema),
      });
    
      function onSubmit(data: IRegistration) {
        registration(data);
      }
    
    return(
        <div>
            <div>
                <button onClick={() => navigate('/login', {replace: true})}>Voltar</button>
            </div>
            <div>
                <span>Criar uma conta</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="full_name">Nome Completo</label>
                <input
                type="text"
                id="full_name"
                placeholder="Digite seu nome completo"
                {...register("full_name")}
                />
                <p>{errors.full_name?.message}</p>

                <label htmlFor="telephone">Telefone</label>
                <input 
                type="text" 
                id='telephone'
                placeholder='Digite seu telefone (celular)'
                {...register('telephone')}
                />
                <p>{errors.telephone?.message}</p>

                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="email"
                placeholder="Digite seu email"
                {...register("email")}
                />
                <p>{errors.email?.message}</p>


                <label htmlFor="password">Senha</label>
                <div>
                    <input type={isClick ? 'text' : 'password'} id="password" placeholder="Digite uma senha" {...register("password")}/>
                    <button onClick={() => setIsClick(!isClick)}>{isClick ? <RxEyeClosed/> : <RxEyeOpen/>}</button>
                </div>
                <p>{errors.password?.message}</p>

                <button type='submit'>Cadastrar-se</button>
            </form>
        </div>
    )
}

export default Registration