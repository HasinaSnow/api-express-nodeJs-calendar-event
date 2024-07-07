import { Request } from "express";
import { auth } from "../config/firebaseConfig";

/**
 * get the unique id of user into the token in request
 * @param req Request
 * @returns Promise<string>
 */
export const getUidTokenInRequest = async (req: Request) => {
    const authToken = req.header('Authorization')?.split(' ')[1];
    return auth.verifyIdToken(authToken as '')
        .then(user => user.uid)
        .catch(error => { throw new Error(error.message)})
}

/**
 * get the unique id of user into the token
 */
export const getUidToken = async (token: string) => {
    const isBearerToken = token.split(' ').length >= 2
    if(isBearerToken) {
        console.log('__is bearer__',)
        token = token.split(' ')[1]
    }
    return auth.verifyIdToken(token)
        .then(user => user.uid)
        .catch(error => { throw new Error(error.message)})

}
