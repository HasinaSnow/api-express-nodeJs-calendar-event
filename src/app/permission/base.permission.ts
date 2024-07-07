import { Request } from "express"
import { BaseModel } from "../models/base.model"
import { PermissionService } from "../services/permission.service"

export abstract class BasePermission {

    protected userCurrent: PermissionService

    constructor(
        protected req: Request,
        public role: string,
        protected model: BaseModel,
    ) {
        this.userCurrent = new PermissionService(req, model)
    }

    abstract toStore(): Promise<Boolean>

    abstract toViewIndex(): Promise<Boolean>

    abstract toShow(id: string): Promise<Boolean>

    abstract toUpdate(id: string): Promise<Boolean>

    abstract toDelete(id: string): Promise<Boolean>

    /**
     * isAdmin || havePermissionRole
     */
    protected async classicPermission() {
        return (await this.userCurrent.isAdmin() || await this.userCurrent.isPermis(this.role))
            ? true : false
    }

    /**
     *  isAdmin || (havePermissionRole && (isAuthor || isSuper))
     * @param id string: idModel
     * @returns Promise<Boolean>
     */
    protected async protectedPermission(id: string) {
        return await this.userCurrent.isAdmin()
            ? true
            : (await this.userCurrent.isPermis(this.role))
            && (await this.userCurrent.isSuper(this.role) || await this.userCurrent.isAuthor(id))
            ? true : false
    }

    /**
     * (iqAdmin || havePermissionRole) && (isSuper || isAuthor)
     * @param id string: idModel
     * @returns Promise<Boolean>
     */
    protected async privatePermission(id: string) {
        return (await this.userCurrent.isAdmin() || await this.userCurrent.isPermis(this.role))
            ? (await this.userCurrent.isSuper(this.role) || await this.userCurrent.isAuthor(id))
            ? true : false
            : false
    }

    /**
     *  havePermissionRole && isSuper
     * @param id string idModel
     * @returns Promise<Boolean>
     */
    protected async superPermission() {
        return await this.userCurrent.isPermis(this.role) 
            && await this.userCurrent.isSuper(this.role)
            ? true : false
    }

}