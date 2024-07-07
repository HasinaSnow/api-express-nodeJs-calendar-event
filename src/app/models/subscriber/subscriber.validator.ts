import { IsArray, IsEmail, IsOptional, IsPhoneNumber } from "class-validator";
import { ISubscriber, ISubscriberUpdate } from "./subscriber.interface";
import { IsUnique } from "../../utils/validators/unique.validator";
import { COLLECTION } from "../../data/default-collection-name";
import { ExistIn } from "../../utils/validators/exists.validator";

export class SubscriberValidator implements ISubscriber {

    @IsEmail()
    @IsUnique(COLLECTION.subscriber, {message: 'The email is already exists'})
    email: string;

    @IsPhoneNumber('MG')
    @IsUnique(COLLECTION.subscriber, {message: 'The phoneNumber is already exists'})
    phone: string;

    @ExistIn(COLLECTION.service, { message: 'The serviceRefs field must be a non-empty array, and each value match to a service document.'})
    @IsArray({ message: 'The serviceRefs field is required and must be an array.'})
    serviceRefs: string[]

    init(model: ISubscriber|any) {
        this.email = (model.email)?.trim() || ''
        this.phone = (model.phone)?.trim() || null
        this.serviceRefs = model.serviceRefs || []
        return {
            email: this.email,
            phone: this.phone,
            serviceRfs: this.serviceRefs
        }
    }

}

export class SubscriberUpdateValidator implements ISubscriberUpdate {
    @IsEmail()
    @IsUnique(COLLECTION.subscriber, {message: 'The email is already exists'})
    @IsOptional()
    email: string | undefined;

    @IsPhoneNumber('MG')
    @IsUnique(COLLECTION.subscriber, { message: 'The email is already exists' })
    @IsOptional()
    phone: string | undefined;

    @ExistIn(COLLECTION.service, { message: 'The serviceRefs field must be a non-empty array, and each value match to a service document.'})
    @IsArray({ message: 'The serviceRefs field is required and must be an array.'})
    @IsOptional()
    serviceRefs?: string[]

    init(model: ISubscriberUpdate) {
        this.email = model.email
        this.phone = model.phone
        this.serviceRefs = model.serviceRefs

        const m = {
            email: this.email,
            phone: this.phone,
            serviceRefs: this.serviceRefs
        } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}