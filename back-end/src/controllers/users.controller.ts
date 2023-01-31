import { Request, Response } from 'express'
import userCreateService from '../services/users/createUser.service'
import listUsersService from '../services/users/listUsers.service'

export const userCreateController = (req: Request, res: Response) => {
    // acessando os dados do corpo da requisição,
        // usando desestruturação
        const {full_name, email, telephone} = req.body
        
        // chamando o Service que vai retornar o newUser,
        // que será inferido pelo TS como tipo IUser
        const newUser = userCreateService({full_name, email, telephone})
        
        // retornando 201 com JSON do newUser para o cliente
        return res.status(201).send(newUser)
}

export const userListController = (req: Request, res: Response) => {
    		// chamamos o Service
				// users será inferido como um array de IUsers ( IUsers[] )
				// pois o Service está retornando o array que tipamos
                const users = listUsersService()
				
				// retornamos 200 com a lista dos usuários (mesmo se estiver vazia)
        return res.send(users)

}