import { IsString, Length, MaxLength } from "class-validator";
import { ICateg } from "./categ.interface";

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
    }
}