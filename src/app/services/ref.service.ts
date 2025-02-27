import { Request } from "express";
import { getUidTokenInRequest } from "../utils/utils";

export class RefService {

    /**
     * add createdAt and updatedAt's property
     * @param data object
     * @return object
     */
    static async addRefs(req: Request, data: object) {

        return {
            ...data,
            createdAt: new Date(),
            createdBy: await getUidTokenInRequest(req),
            updatedAt: null,
            updatedBy: null
        }
    }

    static async newUpdatedRef(req: Request, data: object) {
        return {
            ...data,
            updatedAt: new Date(),
            updatedBy: await getUidTokenInRequest(req),
        }
    }
}