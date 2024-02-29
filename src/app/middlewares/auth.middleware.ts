import { NextFunction, Request, Response } from "express";
import { auth } from "../config/firebaseConfig";
import { ResponseService } from "../utils/response";

// Middleware d'authentification
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.header('Authorization')?.split(' ')[1];
    const response = new ResponseService(res)

    if (!authToken) {
        return response.notAuthenticated()
    }

    auth.verifyIdToken(authToken)
        .then((decodedToken) => {
            // refresh token
            auth.createCustomToken(decodedToken.uid)
                .then((token: string) => {
                    res.setHeader('Authorization', 'Bearer ' + token)
                    next();
                })
        })
        .catch((error) =>{
            switch (error.code) {
                case 'auth/expired-id-token':
                    return response.errorServer(error)

                default:
                    return response.notAuthenticated()
            }
        });
};