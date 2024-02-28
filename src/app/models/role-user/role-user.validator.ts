import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IRoleUser, IRoleUserUpdate } from "./role-user.interface";
import { ExistIn } from "../../utils/validators/exists.validator";
import { COLLECTION } from "../../data/default-collection-name";

export class RoleUserValidator implements IRoleUser {
    @IsString()
    @IsNotEmpty({message: 'The user id is required.'})
    @ExistIn(COLLECTION.user, {message: 'The user id is invalid'})
    userId: string;

    @IsString()
    @IsNotEmpty({message: 'The role id is required.'})
    @ExistIn(COLLECTION.role, {message: 'The role id is invalid'})
    roleId: string;

    @IsBoolean()
    @IsNotEmpty({message: 'The field isSuper is required.'})
    isSuper: boolean | undefined;

    init(model: IRoleUser) {
        this.userId = model.userId || ''
        this.roleId = model.roleId || ''
        this.isSuper = (model.isSuper !== undefined) ? model.isSuper : undefined 
        return { userId: this.userId, roleId: this.roleId, isSuper: this.isSuper}
    }
}

export class RoleUserUpdateValidator implements IRoleUserUpdate {
    @IsString()
    @IsOptional()
    @ExistIn(COLLECTION.user, {message: 'The user id is invalid'})
    userId: string |undefined;

    @IsString()
    @IsOptional()
    @ExistIn(COLLECTION.role, {message: 'The role id is invalid'})
    roleId: string |undefined;

    @IsOptional()
    @IsBoolean()
    isSuper: boolean | undefined;

    init(model: IRoleUserUpdate) {
        this.userId = model.userId
        this.roleId = model.roleId
        this.isSuper = model.isSuper

        const m = {userId: this.userId, roleId: this.roleId, isSuper: this.isSuper } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}