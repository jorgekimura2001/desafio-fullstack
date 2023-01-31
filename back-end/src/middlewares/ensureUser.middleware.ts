import { NextFunction, Request, Response } from "express";

const ensureUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const idParams = req.params.id
    const idUserLogged = req.user.id
    if(idParams !== idUserLogged){
        return res.status(401).json({
            message: "You don't have permission.",
          });
    }
    return next()
}

export default ensureUserMiddleware