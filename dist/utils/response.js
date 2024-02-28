"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
class ResponseService {
    constructor(res, subject = 'Data') {
        this.res = res;
        this.subject = subject;
    }
    success(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject,
            data: data
        });
    }
    errorServer(error) {
        return this.res.status(500).json({
            status: false,
            message: 'Error server',
            data: error
        });
    }
    sendingConfirmationKey(data = [], subject = 'email') {
        return this.res.status(200).json({
            status: true,
            message: 'We have sending your confirmation key to your ' + subject,
            data: data
        });
    }
    emailNotVerified() {
        return this.res.status(403).json({
            status: false,
            message: 'Your email has not been verified yet.',
            data: []
        });
    }
    passwordInvalid() {
        return this.res.status(403).json({
            status: false,
            message: 'The password is invalid.',
            data: []
        });
    }
    successlogin(token) {
        return this.res
            .setHeader('Authorization', 'Bearer ' + token)
            .status(200).json({
            status: true,
            message: 'Your are successfully login',
            data: []
        });
    }
    successLogout() {
        return this.res
            .setHeader('Authorization', '')
            .status(200).json({
            status: true,
            message: 'Your are successfully logout',
            data: []
        });
    }
    errorValidation(errors) {
        const dataError = errors.map(error => { return { property: error.property, constraints: error.constraints }; });
        return this.res.status(400).json({
            status: false,
            message: 'Validation\'s error.',
            data: dataError
        });
    }
    invalidRequest(error = 'Invalid request') {
        return this.res.status(400).json({
            status: false,
            message: error,
            data: []
        });
    }
    successfullGetted(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully retrieved.',
            data: data
        });
    }
    successfullStored(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully stored.',
            data: data
        });
    }
    successfullUpdated(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully updated.',
            data: data
        });
    }
    successfullDeleted(data = []) {
        return this.res.status(200).json({
            status: true,
            message: this.subject + ' successfully deleted.',
            data: data
        });
    }
    notAuthorized(data = []) {
        return this.res.status(401).json({
            status: false,
            message: 'You are not authorized for this operation.',
            data: data
        });
    }
    notAuthenticated(data = []) {
        return this.res.status(401).json({
            status: false,
            message: 'Access denied, you are not Authenticated.',
            data: data
        });
    }
    notFound(data = []) {
        return this.res.status(404).json({
            status: false,
            message: this.subject + ' not found.',
            data: data
        });
    }
}
exports.ResponseService = ResponseService;
