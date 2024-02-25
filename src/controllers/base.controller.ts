import { Request, Response } from "express";
import { BaseModel } from "../models/base.model";
import { ResponseService } from "../utils/response";
import { validate, validateOrReject } from "class-validator";

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
        protected validator: any,
        ) {
        this.response = new ResponseService(res, subject)
    }

    store(): void {
        const data = this.validator.init(this.req.body)

        validate(this.validator).then(errors => {
            if (errors.length > 0) {
                return this.response.errorValidation(errors);
            } else {
                this.model.create(data)
                    .then(() => this.response.successfullStored())
                    .catch((error) => this.response.errorServer(error))
            }
          });

    }

    index(): void {
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

    show(): void {
        const id = this.req.params.id
        this.model.getOne(id)
            .then(value => {
                return value.exists
                    ? this.response.successfullGetted({id: value.id, ...value.data()} as any)
                    : this.response.notFound()
            })
            .catch(error => this.response.errorServer(error))
    }

    update(): void {
        const id = this.req.params.id
        const data = this.validator.init(this.req.body)

        validate(this.validator).then(errors => {
            if(errors.length > 0)
                return this.response.errorValidation(errors)

            this.model.update(id, data)
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

        this.model.delete(id)
            .then(async (value) => this.response.successfullDeleted(value as any))
            .catch(error => this.response.errorServer(error))
    }

    protected exists(id: string) {
        return this.model.exists(id)
    }
}