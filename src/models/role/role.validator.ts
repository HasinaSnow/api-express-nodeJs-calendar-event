import { IsOptional, IsString, Length, MaxLength } from "class-validator";
import { IRole, IRoleUpdate } from "./role.interface";
import { IsUnique } from "../../utils/validators/unique.validator";

export class RoleValidator implements IRole {
    @IsString()
    @Length(3, 20)
    @IsUnique('roles', {message: 'The name field is already exists.'})
    name: string;

    @IsString()
    @MaxLength(255)
    infos?: string | undefined;

    init(model: IRole) {
        this.name = model.name || ''
        this.infos = model.infos || ''
        return { name: this.name, infos: this.infos }
    }
}

export class RoleUpdateValidator implements IRoleUpdate {
    @IsString()
    @Length(3, 20)
    @IsOptional()
    name: string |undefined;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    infos: string | undefined;

    init(model: IRoleUpdate) {
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