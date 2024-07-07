import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { RoleUserPermission } from "../permission/role-user.permission";
import { SUBJECT } from "../data/default-collection-name";
import { RoleUser } from "../models/role-user/role-user.model";
import { RoleUserValidator, RoleUserUpdateValidator } from "../models/role-user/role-user.validator";
import { validate } from "class-validator";
import { RefService } from "../services/ref.service";
import { exit } from "process";
import { Role } from "../models/role/role.model";
import { ROLE_NAME } from "../data/default-role-name.data";

export class RoleUserController extends BaseController {

    constructor(req: Request, res: Response, private roleUser = new RoleUser(), private permission: RoleUserPermission = new RoleUserPermission(req)) {
        super(
            req,
            res,
            SUBJECT.roleUser,
            roleUser, 
            new RoleUserValidator(),
            new RoleUserUpdateValidator(),
            permission
        )
    }

    async attribute() {
        let data = this.createValidator.init(this.req.body)

        // verify permission
        if(!await this.permission.toAttribute())
            return this.response.notAuthorized()

        // verify validation
        const errors = await validate(this.createValidator)
        if (errors.length > 0) return this.response.errorValidation(errors);

        // verify the attributed role
        if(await this.isNotAttributedRef())
            return this.response.notAuthorized()

        // store data with ref in db
        const dataWithRef = await RefService.addRefs(this.req, data)
        this.model.create(dataWithRef)
            .then((data) => {
                // dispacth notif

                // return response
                return this.response.successfullStored(data)
            })
            .catch((error) => this.response.errorServer(error))
    }

    async updateAttribute() {
        const id = this.req.params.id
        const data = this.updateValidator.init(this.req.body)

        // verify permission
        if (!await this.permission.toUpdateAttribute(id))
            return  this.response.notAuthorized()

        // verify validation
        const errors = await validate(this.createValidator)
        if (errors.length > 0) return this.response.errorValidation(errors);

        // verify the attributed role
        if(await this.isNotAttributedRef())
            return this.response.notAuthorized()

        // create data with updatedRef (updatedBy & updatedAt)
        const dataWithRef = await RefService.newUpdatedRef(this.req, data)
        return this.model.update(id, dataWithRef)
            .then(value => this.response.successfullUpdated(value as any))
            .catch(error => (error.code == 5)
                ? this.response.notFound() 
                : this.response.errorServer(error)
            )
    }

    private async isNotAttributedRef() {
        const role = new Role()
        const isAdminRef = (await role.getIdByName(ROLE_NAME.admin)) == this.req.body.roleId
        const isRoleUserManagerRef =  (await role.getIdByName(ROLE_NAME.roleUserManager)) == this.req.body.roleId
        const isRoleManagerRef =  (await role.getIdByName(ROLE_NAME.roleManager)) == this.req.body.roleId
        return (isAdminRef || isRoleUserManagerRef || isRoleManagerRef)
    }

}