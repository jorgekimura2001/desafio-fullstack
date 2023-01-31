import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import loginSessionService from '../services/sessions/loginSession.service'

const loginSessionController = async(req: Request, res: Response) => {
    const {email, password} = req.body
    // console.log(req)
    const data = await loginSessionService({email, password})

    return res.status(200).json(instanceToPlain(data))
}

export default loginSessionController