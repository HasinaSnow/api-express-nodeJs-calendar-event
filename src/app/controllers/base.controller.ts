import { Request, Response } from "express";
import { ResponseService } from "../utils/response";
import { isDateString, validate } from "class-validator";
import { BasePermission } from "../permission/base.permission";
import { BaseModel } from "../models/base.model";
import { RefService } from "../services/ref.service";
import { RoleUser } from "../models/role-user/role-user.model";
import { Role } from "../models/role/role.model";
import { User } from "../models/user/user.model";
import { Event } from "../models/event/event.model";
import { NotifService } from "../services/notif.service";
import { getUidTokenInRequest } from "../utils/utils";
import { INotifMessage } from "../models/notif/notif.interface";
import { ROLE_NAME } from "../data/default-role-name.data";
import { SUBJECT } from "../data/default-collection-name";

interface ControllerMethods {
    store(): void,
    index(): void,
    show(): void
    update(): void,
    delete(): void
}

export abstract class BaseController implements ControllerMethods {

    protected response: ResponseService

    constructor(
        protected req: Request,
        protected res: Response,
        protected subject: string,
        protected model: BaseModel,
        protected createValidator: any,
        protected updateValidator: any,
        protected isPermis: BasePermission
        ) {
        this.response = new ResponseService(res, subject)
    }

    async store() {
        let data = this.createValidator.init(this.req.body)

        // verify permission
        if(!await this.isPermis.toStore())
            return this.response.notAuthorized()

        // verify validation
        const errors = await validate(this.createValidator)
        if (errors.length > 0) return this.response.errorValidation(errors);

        // store data with ref in db
        const dataWithRef = await RefService.addRefs(this.req, data)
        return this.model.create(dataWithRef)
            .then(async value => {
                // dispacth notif
                const notif = new NotifService()
                const targets = await this.getNotifTargets(data)
                const dataNotif = await this.getNotifData(value.id, 'create')
                notif.dispatch(dataNotif, targets)
                    .then(value => {
                        notif.broadcast(value.notifId)
                    })
            })
            .then(_ => this.response.successfullStored())
            .catch((error) => this.response.errorServer(error))
    }

    async index() {
        // verify permission
        if(!await this.isPermis.toViewIndex())
            return this.response.notAuthorized()

        const limit = this.req.params.limit !== undefined 
            ? !Number.isNaN(parseInt(this.req.params.limit))
            ? parseInt(this.req.params.limit)
            : 30 : 30
            const lastField = isDateString(this.req.params.lastField) ? new Date(this.req.params.lastField) : undefined


        this.model.getAll(limit, lastField)
            .then((result) => {
                const data = this.model.formatView(result.docs)
                return this.response.successfullGetted(data as any)
            })
            .catch(error => this.response.errorServer(error))
    }

    async show() {
        const id = this.req.params.id
        this.model.getOne(id)
            .then(async value => {
                if(value.exists) {
                    // verify permission
                    if (!await this.isPermis.toShow(id))
                        return  this.response.notAuthorized()

                    return this.response.successfullGetted({id: value.id, ...value.data()} as any)
                } else {
                    return  this.response.notFound()
                }
            })
            .catch(error => this.response.errorServer(error))
    }

    async update() {
        const id = this.req.params.id
        const data = this.updateValidator.init(this.req.body)

        // verify permission
        if (!await this.isPermis.toUpdate(id))
            return  this.response.notAuthorized()

        // verify validation
        const errors = await validate(this.updateValidator)
        if (errors.length > 0) return this.response.errorValidation(errors);

        // create data with updatedRef (updatedBy & updatedAt)
        const dataWithRef = await RefService.newUpdatedRef(this.req, data)
        return this.model.update(id, dataWithRef)
            .then(async _ => {
                // dispacth notif
                const notif = new NotifService()
                const targets = await this.getNotifTargets(data)
                const messageNotif = await this.getNotifMessage(id, 'update')
                notif.dispatch(messageNotif, targets)
                    .then(value => {
                        notif.broadcast(value.notifId)
                    })
            })
            .then(value => this.response.successfullUpdated(value as any))
            .catch(error => (error.code == 5)
                ? this.response.notFound() 
                : this.response.errorServer(error)
            )

    }

    async delete() {
        const id = this.req.params.id
        const onCascade = this.req.params.onCascade

        // verify id
        if(!await this.exists(id))
            return this.response.notFound()

        // verify permission
        if (!await this.isPermis.toDelete(id))
            return  this.response.notAuthorized()

        // fetch data before delete
        const dataNotif = await this.getNotifData(id)

        // delete document
        this.model.delete(id)
            .then(async _ => {
                // dispacth notif
                const notif = new NotifService()
                const targets = await this.getNotifTargets(dataNotif)
                const messageNotif = await this.getNotifMessage(id, 'delete')
                notif.dispatch(messageNotif, targets)
                    .then(value => {
                        notif.broadcast(value.notifId, {})
                    })
            })
            .then(async (value) => this.response.successfullDeleted(value as any))
            .catch(error => this.response.errorServer(error))
    }

    protected exists(id: string) {
        return this.model.exists(id)
    }

    /**
     * 
     * @param data
     * @returns 
     */
    protected async getNotifTargets(data: any) {
        const roleId = await (new Role().getIdByName(this.isPermis.role))
        const roleAdminId = await (new Role().getIdByName(ROLE_NAME.admin))
        let targets = await (new RoleUser().getUserRefsByRoles([roleAdminId, roleId]))
        if(this.subject == SUBJECT.event) {
            const targetRefsByService: string[] = (await new User().getUserRefsByServices(data.serviceRefs as string[]))
            targets = [...targets, ...targetRefsByService]
        }
        return targets
    }

    /**
     * get the notification message formated
     * @param string subjectId
     * @param string type
     * @return Promise<INotifMessage>
     */
    protected async getNotifMessage(subjectId: string, type: string): Promise<INotifMessage> {
        return {
            type: type,
            subject: this.subject,
            subjectId: subjectId,
            author: await getUidTokenInRequest(this.req),
            createdAt: new Date()
        }
    }
}