import { IsDateString, IsEmail, IsOptional, IsPhoneNumber } from "class-validator";
import { ISubscriber } from "./subscriber.interface";
import { IsUnique } from "../../utils/validators/unique.validator";

export class SubscriberValidator implements ISubscriber {

    @IsEmail()
    @IsUnique('subscribers')
    email: string;

    @IsPhoneNumber('MG')
    @IsOptional()
    phone: string;

    @IsDateString()
    @IsOptional()
    subscribeAt: Date | null;

    init(model: ISubscriber|any) {
        this.email = (model.email).trim() || ''
        this.phone = (model.phone).trim() || ''
        this.subscribeAt = model.subscribeAt || ''
        return { email: this.email, phone: this.phone, subscribeAt: this.subscribeAt }
    }

}