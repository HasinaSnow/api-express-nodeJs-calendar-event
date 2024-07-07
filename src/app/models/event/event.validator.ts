import {  IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { IEvent, IEventUpdate } from "./event.interface";
import { ExistIn } from "../../utils/validators/exists.validator";
import { COLLECTION } from "../../data/default-collection-name";

export class EventValidator {

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @MaxLength(255)
    infos?: string;

    @IsString()
    @IsNotEmpty({message: 'The id category field is required.'})
    @ExistIn(COLLECTION.categ, { message: 'The specified category is not found' })
    categId: string;

    @ExistIn(COLLECTION.service, { message: 'The serviceRefs field must be a non-empty array, and each value match to a service document.'})
    @IsArray({ message: 'The serviceRefs field is required and must be an array.'})
    serviceRefs: string[]

    init(model: IEvent) {
        this.date = model.date
        this.infos = model.infos || ''
        this.categId = model.categId
        this.serviceRefs = model.serviceRefs || []
        return { 
            date: new Date(this.date),
            infos: this.infos,
            categId: this.categId,
            serviceRefs: this.serviceRefs
        }
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
    @ExistIn(COLLECTION.categ, { message: 'The specified category is not found' })
    @IsOptional()
    categId?: string;

    @IsArray({ message: 'The serviceRefs must be an array of string.'})
    @ExistIn(COLLECTION.service, { message: 'The serviceRefs field must be a non-empty array, and each value match to a service document.'})
    @IsOptional()
    serviceRefs?: string[]

    init(model: { [key: string]: any }) {
        this.date = model.date
        this.infos = model.infos
        this.categId = model.categId
        this.serviceRefs = model.serviceRefs

        const m = {
            date: this.date? new Date(this.date): undefined,
            infos: this.infos,
            categId: this.categId,
            serviceRefs: this.serviceRefs
        } as { [key: string]: any }

        return Object.keys(m)
        .reduce((result: { [key: string]: any }, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            console.log('__serviceRefs___', result)
            return result;
            }, {});
    }
}