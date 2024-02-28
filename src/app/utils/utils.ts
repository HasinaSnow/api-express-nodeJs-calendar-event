import { Request } from "express";
import { auth } from "../config/firestore";

/**
 * decode the token in request and get the uid
 * @param req Request
 * @returns Promise<string>
 */
export const getUidToken = async (req: Request) => {
    const authToken = req.header('Authorization')?.split(' ')[1];
    return auth.verifyIdToken(authToken as '')
        .then(user => user.uid)
        .catch(_ => '')
}