import {  IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { IEvent, IEventUpdate } from "./event.interface";
import { ExistIn } from "../../utils/validators/exists.validator";
import { COLLECTION } from "../../data/default-collection-name";

export class EventValidator implements IEvent {

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @MaxLength(255)
    infos?: string;

    @IsString()
    @IsNotEmpty()
    @ExistIn(COLLECTION.categ, { message: 'The specified category is not found' })
    categId: string;

    init(model: IEvent) {
        this.date = model.date
        this.infos = model.infos || ''
        this.categId = model.categId
        return { date: this.date, infos: this.infos, categId: this.categId }
    }

}

export class EventUpdateValidator implements IEventUpdate {
    @IsDateString()
    @IsOptional()
    date?: Date;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    infos?: string;

    @IsString()
    @ExistIn('categs', { message: 'The specified category is not found' })
    @IsOptional()
    categId?: string;

    init(model: { [key: string]: any }) {
        this.date = model.date
        this.infos = model.infos
        this.categId = model.categId

        const m = {date: this.date, infos: this.infos, categId: this.categId } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}