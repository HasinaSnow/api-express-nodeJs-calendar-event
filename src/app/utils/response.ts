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

    sendingConfirmationKey(data: any = [], subject: string = 'email') {
        return this.res.status(200).json({
            status: true,
            message: 'We have sending your confirmation key to your ' + subject,
            data: data
        })
    }

    emailNotVerified() {
        return this.res.status(403).json({
            status: false,
            message: 'Your email has not been verified yet.',
            data: []
        })
    }

    passwordInvalid() {
        return this.res.status(403).json({
            status: false,
            message: 'The password is invalid.',
            data: []
        })
    }

    successlogin(token: string) {
        return this.res
            .setHeader('Authorization', 'Bearer ' + token)
            .status(200).json({
            status: true,
            message: 'Your are successfully login',
            data: []
        })
    }

    successLogout() {
        return this.res
            .setHeader('Authorization', '')
            .status(200).json({
            status: true,
            message: 'Your are successfully logout',
            data: []
        })
    }

    errorValidation(errors: ValidationError[]) {
        const dataError = errors.map(error => { return {property: error.property, constraints:error.constraints}})
        return this.res.status(400).json({
            status: false,
            message: 'Validation\'s error.',
            data: dataError
        })
    }

    invalidRequest(error: string = 'Invalid request') {
        return this.res.status(400).json({
            status: false,
            message: error,
            data: []
        })
    }

    successfullGetted(data: any = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully retrieved.',
            data: data
        })
    }

    successfullStored (data: any = []) {
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
        return this.res.status(401).json({
            status: false,
            message: 'You are not authorized for this operation.',
            data: data
        })
    }

    notAuthenticated(data: any = []) {
        return this.res.status(401).json({
            status: false,
            message: 'Access denied, you are not Authenticated.',
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








