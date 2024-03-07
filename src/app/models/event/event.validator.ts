import {  IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { IEvent, IEventUpdate } from "./event.interface";
import { ExistIn } from "../../utils/validators/exists.validator";
import { COLLECTION } from "../../data/default-collection-name";

export class EventValidator implements IEvent {

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @MaxLength(255)
    infos?: string;

    @IsString()
    @IsNotEmpty()
    @ExistIn(COLLECTION.categ, { message: 'The specified category is not found' })
    categId: string;

    // @IsString()
    // @IsArray()
    // @IsNotEmpty({ message: 'The service id is required.'})
    // @ExistIn(COLLECTION.service, { message: 'One of id service is invalid'})
    // serviceRefs: string[]

    init(model: IEvent) {
        this.date = model.date
        this.infos = model.infos || ''
        this.categId = model.categId
        // this.serviceRefs = model.serviceRefs
        return { date: new Date(this.date), infos: this.infos, categId: this.categId }
    }

}

export class EventUpdateValidator implements IEventUpdate {
    @IsDateString()
    @IsOptional()
    date?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    infos?: string;

    @IsString()
    @ExistIn('categs', { message: 'The specified category is not found' })
    @IsOptional()
    categId?: string;

    // @IsString()
    // @IsArray()
    // @IsNotEmpty({ message: 'The service id is required.'})
    // @IsOptional()
    // @ExistIn(COLLECTION.service, { message: 'One of id service is invalid'})
    // serviceRefs?: string[]

    init(model: { [key: string]: any }) {
        this.date = model.date
        this.infos = model.infos
        this.categId = model.categId
        // this.serviceRefs = model.serviceRefs

        const m = {date: this.date? new Date(this.date): undefined, infos: this.infos, categId: this.categId } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}