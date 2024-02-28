import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ILogin } from "./account.interface";

export class LoginValidator {

    @IsNotEmpty({ message: 'This field must be required' })
    @IsEmail({}, { message: 'This field must be an valid email.' })
    email: string

    @IsString()
    @Length(5, 25)
    @IsNotEmpty({message: 'Your password is required'})
    password: string

    init(model: ILogin) {
        this.email = model.email || ''
        this.password = model.password || ''

        return { email: this.email, password: this.password}
    }
}