import { Request, Response } from "express";
import { ResponseService } from "../utils/response";
import { validate } from "class-validator";
import { BasePermission } from "../permission/base.permission";
import { BaseModel } from "../models/base.model";
import { RefService } from "../services/ref.service";
import { NotifService } from "../services/notif.service";

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
        validate(this.createValidator)
            .then(async errors => {
                if (errors.length > 0) {
                    return this.response.errorValidation(errors);
                } else {
                    // create data with createRef (updatedBy & updatedAt)
                    const dataWithRef = await RefService.addRefs(this.req, data)
                    // store data with ref in db
                    this.model.create(dataWithRef)
                        .then((data) => {
                            // dispacth notif

                            // return response
                            return this.response.successfullStored()
                        })
                        .catch((error) => this.response.errorServer(error))
                }
            });
    }

    async index() {
        // verify permission
        if(!await this.isPermis.toViewIndex())
            return this.response.notAuthorized()

        this.model.getAll()
            .then((values) => {
                let data: any[] = []
                values.forEach(doc => {
                    data.push({id: doc.id, ...doc.data()})
                });
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

        validate(this.updateValidator).then(async errors => {
            if(errors.length > 0)
                return this.response.errorValidation(errors)

            // verify permission
            if (!await this.isPermis.toUpdate(id))
                return  this.response.notAuthorized()

            // create data with updatedRef (updatedBy & updatedAt)
            const dataWithRef = await RefService.newUpdatedRef(this.req, data)
            this.model.update(id, dataWithRef)
                .then(value => this.response.successfullUpdated(value as any))
                .catch(error => (error.code == 5)
                    ? this.response.notFound() 
                    : this.response.errorServer(error)
                )
        })

    }

    async delete() {
        const id = this.req.params.id

        if(!await this.exists(id))
            return this.response.notFound()

        // verify permission
        if (!await this.isPermis.toDelete(id))
            return  this.response.notAuthorized()

        this.model.delete(id)
            .then(async (value) => this.response.successfullDeleted(value as any))
            .catch(error => this.response.errorServer(error))
    }

    protected exists(id: string) {
        return this.model.exists(id)
    }
}