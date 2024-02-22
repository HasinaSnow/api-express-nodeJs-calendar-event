import {  IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IEvent } from "./event.interface";
import { ExistIn } from "../../utils/validators/exists.validator";

export class EventValidator implements IEvent {

    @IsDate({message: 'This field must be a valid date'})
    @IsNotEmpty()
    date: Date;

    @IsString()
    @MaxLength(255)
    infos?: string;

    @IsString()
    @IsNotEmpty()
    @ExistIn('Categs', { message: 'The specified category is not found' })
    categId: string;

    init(model: IEvent) {
        this.date = model.date
        this.infos = model.infos || ''
        this.categId = model.categId
    }

}