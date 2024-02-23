import {  IsDate, IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IEvent } from "./event.interface";
import { ExistIn } from "../../utils/validators/exists.validator";

export class EventValidator implements IEvent {

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @MaxLength(255)
    infos?: string;

    @IsString()
    @IsNotEmpty()
    @ExistIn('categs', { message: 'The specified category is not found' })
    categId: string;

    init(model: IEvent) {
        this.date = model.date
        this.infos = model.infos || ''
        this.categId = model.categId
        return { date: this.date, infos: this.infos, categId: this.categId }
    }

}