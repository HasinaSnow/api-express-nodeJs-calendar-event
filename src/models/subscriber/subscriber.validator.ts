import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { ISubscriber } from "./subscriber.interface";
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