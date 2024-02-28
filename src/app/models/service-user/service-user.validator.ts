import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ExistIn } from "../../utils/validators/exists.validator";
import { COLLECTION } from "../../data/default-collection-name";
import { IServiceUser, IServiceUserUpdate } from "./service-user.interface";

export class ServiceUserValidator implements IServiceUser {
    @IsString()
    @IsNotEmpty({message: 'The user id is required.'})
    @ExistIn(COLLECTION.user, {message: 'The user id is invalid'})
    userId: string;

    @IsString()
    @IsNotEmpty({message: 'The role id is required.'})
    @ExistIn(COLLECTION.service, {message: 'The service id is invalid'})
    serviceId: string;

    init(model: IServiceUser) {
        this.userId = model.userId || ''
        this.serviceId = model.serviceId || ''
        return { userId: this.userId, serviceId: this.serviceId}
    }
}

export class ServiceUserUpdateValidator implements IServiceUserUpdate {
    @IsString()
    @IsOptional()
    @ExistIn(COLLECTION.user, {message: 'The user id is invalid'})
    userId: string |undefined;

    @IsString()
    @IsOptional()
    @ExistIn(COLLECTION.service, {message: 'The service id is invalid'})
    serviceId: string |undefined;

    init(model: IServiceUserUpdate) {
        this.userId = model.userId
        this.serviceId = model.serviceId

        const m = {userId: this.userId, serviceId: this.serviceId } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}