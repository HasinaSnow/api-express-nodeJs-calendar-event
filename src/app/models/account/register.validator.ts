import { IsNotEmpty, IsString, Length } from "class-validator";
import { IRegister } from "./account.interface";
import { ExistIn } from "../../utils/validators/exists.validator";
import { IValidator } from "../validator.interface";
import { IsUnique } from "../../utils/validators/unique.validator";

export class RegisterValidator implements IValidator {

    @IsString()
    @IsNotEmpty({message: 'Your Name number is required'})
    @Length(3, 25)
    name: string

    @IsNotEmpty({ message: 'The email field must be required.' })
    @ExistIn('subscribers', {message: 'You are not authorized to register. Please, contact the service.'})
    @IsUnique('users', {message: 'This email is already taked.'})
    email: string

    @IsString()
    @Length(5, 25)
    @IsNotEmpty({message: 'Your Phone number is required'})
    password: string

    init(model: IRegister) {
        this.name = model.name || ''
        this.email = model.email || ''
        this.password = model.password || ''

        return { name: this.name, email: this.email, password: this.password}
    }

    }