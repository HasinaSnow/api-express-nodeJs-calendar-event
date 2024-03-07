import { IsArray, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { IUser, IUserUpdate } from "./user.interface";
import { IsUnique } from "../../utils/validators/unique.validator";
import { COLLECTION } from "../../data/default-collection-name";
import { ExistIn } from "../../utils/validators/exists.validator";

export class UserValidator implements IUser {

    @IsString()
    @IsNotEmpty({message: 'Your Name is required'})
    @IsUnique(COLLECTION.user, {message: 'The name is already exists'})
    @Length(3, 25)
    name: string

    @IsString()
    @IsNotEmpty({message: 'The user id is required.'})
    userRef: string;

    @IsString()
    @MaxLength(255)
    infos: string;

    @IsString()
    @IsArray()
    @IsNotEmpty({ message: 'The service id is required.'})
    @IsOptional()
    @ExistIn(COLLECTION.service, { message: 'One of id service is invalid'})
    serviceRefs: string[]

    init(model: IUser) {
        this.name = model.name || ''
        this.userRef = model.userRef || ''
        this.infos = model.infos || ''

        return { name: this.name, infos: this.infos, userRef: this.userRef, serviceRefs: this.serviceRefs }
    }
}

export class UserUpdateValidator implements IUserUpdate {

    @IsString()
    @IsNotEmpty({message: 'Your Name is required'})
    @Length(3, 25)
    @IsUnique(COLLECTION.user, {message: 'The name is already exists'})
    @IsOptional()
    name: string | undefined

    @IsString()
    @MaxLength(255)
    @IsOptional()
    infos: string | undefined;

    @IsString()
    @IsArray()
    @IsNotEmpty({ message: 'The service id is required.'})
    @IsOptional()
    @ExistIn(COLLECTION.service, { message: 'One of id service is invalid'})
    serviceRefs?: string[]

    init(model: IUserUpdate) {
        this.name = model.name
        this.infos = model.infos

        const m = {name: this.name, infos: this.infos, serviceRefs: this.serviceRefs } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }

}