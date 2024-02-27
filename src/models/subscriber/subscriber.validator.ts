import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { ISubscriber, ISubscriberUpdate } from "./subscriber.interface";
import { IsUnique } from "../../utils/validators/unique.validator";

export class SubscriberValidator implements ISubscriber {

    @IsEmail()
    @IsUnique('subscribers', {message: 'The email is already exists'})
    @IsOptional()
    email: string;

    @IsPhoneNumber('MG')
    @IsUnique('subscribers', {message: 'The email is already exists'})
    @IsOptional()
    phone: string;

    @IsDateString()
    @IsOptional()
    subscribeAt: Date | null;

    init(model: ISubscriber|any) {
        this.email = (model.email)?.trim() || ''
        this.phone = (model.phone)?.trim() || null
        this.subscribeAt = model.subscribeAt || null
        return { email: this.email, phone: this.phone, subscribeAt: this.subscribeAt }
    }

}

export class SubscriberUpdateValidator implements ISubscriberUpdate {
    @IsEmail()
    @IsUnique('subscribers', {message: 'The email is already exists'})
    @IsOptional()
    email: string | undefined;

    @IsPhoneNumber('MG')
    @IsUnique('subscribers', {message: 'The email is already exists'})
    @IsOptional()
    phone: string | undefined;

    @IsDateString()
    @IsOptional()
    subscribeAt: Date | undefined;

    init(model: ISubscriberUpdate) {
        this.email = model.email
        this.phone = model.phone
        this.subscribeAt = model.subscribeAt

        const m = {email: this.email, phone: this.phone, subscribeAt: this.subscribeAt } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}