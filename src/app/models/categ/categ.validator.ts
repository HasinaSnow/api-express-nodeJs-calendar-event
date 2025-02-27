import { IsOptional, IsString, Length, MaxLength } from "class-validator";
import { ICateg, ICategUpdate } from "./categ.interface";

export class CategValidator implements ICateg {
    @IsString()
    @Length(3, 20)
    name: string;

    @IsString()
    @MaxLength(255)
    infos?: string | undefined;

    init(model: ICateg) {
        this.name = model.name
        this.infos = model.infos || ''
        return { name: this.name, infos: this.infos }
    }
}

export class CategUpdateValidator implements ICategUpdate {
    @IsString()
    @Length(3, 20)
    @IsOptional()
    name: string |undefined;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    infos: string | undefined;

    init(model: ICategUpdate) {
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