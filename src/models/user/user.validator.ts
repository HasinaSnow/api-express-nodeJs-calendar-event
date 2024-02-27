import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { IUser, IUserUpdate } from "./user.interface";

export class UserValidator implements IUser {

    @IsString()
    @IsNotEmpty({message: 'Your Name is required'})
    @Length(3, 25)
    name: string

    @IsString()
    @IsNotEmpty({message: 'The user id is required.'})
    userRef: string;

    @IsString()
    @MaxLength(255)
    infos: string;

    init(model: IUser) {
        this.name = model.name || ''
        this.userRef = model.userRef || ''
        this.infos = model.infos || ''
        return { name: this.name, infos: this.infos, userRef: this.userRef }
    }
}

export class UserUpdateValidator implements IUserUpdate {

    @IsString()
    @IsNotEmpty({message: 'Your Name is required'})
    @Length(3, 25)
    @IsOptional()
    name: string | undefined

    @IsString()
    @MaxLength(255)
    @IsOptional()
    infos: string | undefined;

    init(model: IUserUpdate) {
        this.name = model.name
        this.infos = model.infos

        const m = {name: this.name, infos: this.infos } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }

}