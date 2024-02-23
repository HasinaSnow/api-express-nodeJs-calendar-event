import { ValidationError } from "class-validator"
import { Response } from "express"

export class ResponseService {

    constructor(
        private res: Response,
        private subject: string = 'Data'
    ) {}

    success(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject,
            data: data
        })
    }

    errorServer(error: any) {
        return this.res.status(500).json({
            status: false,
            message: 'Error server',
            data: error
        })
    }

    errorValidation(errors: ValidationError[]) {
        const data = errors.map(error => { return {property: error.property, constraints:error.constraints}})
        return this.res.status(400).json({
            status: false,
            message: 'Validation\'s error.',
            data: data
        })
    }

    successfullGetted(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully retrieved.',
            data: data
        })
    }

    successfullStored (data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully stored.',
            data: data
        })
    }

    successfullUpdated(data= []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully updated.',
            data: data
        })
    }

    successfullDeleted(data= []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully deleted.',
            data: data
        })
    }

    notAuthorized(data= []) {
        return this.res.status(403).json({
            status: false,
            message: this.subject + ' not authorized.',
            data: data
        })
    }

    notAuthenticated(data: []) {
        return this.res.status(403).json({
            status: false,
            message: 'Acess denied, you are not Authenticated.',
            data: data
        })
    }

    notFound(data= []) {
        return this.res.status(404).json({
            status: false,
            message: this.subject + ' not found.',
            data: data
        })
    }
}








