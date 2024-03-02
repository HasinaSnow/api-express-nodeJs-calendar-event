import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ExistIn } from "../../utils/validators/exists.validator";
import { COLLECTION } from "../../data/default-collection-name";
import { IEventService, IEventServiceUpdate } from "./event-service.interface";

export class EventServiceValidator implements IEventService {
    @IsString()
    @IsNotEmpty({message: 'The event id is required'})
    @ExistIn(COLLECTION.event, {message: 'The user id is invalid'})
    eventId: string;

    @IsString()
    @IsNotEmpty({message: 'The service id is required'})
    @ExistIn(COLLECTION.service, {message: 'The service id is invalid'})
    serviceId: string;

    init(model: IEventService) {
        this.eventId = model.eventId || ''
        this.serviceId = model.serviceId || ''
        return { eventId: this.eventId, serviceId: this.serviceId}
    }
}

export class EventServiceUpdateValidator implements IEventServiceUpdate {
    @IsString()
    @IsOptional()
    @ExistIn(COLLECTION.event, {message: 'The event id is invalid'})
    eventId: string |undefined;

    @IsString()
    @IsOptional()
    @ExistIn(COLLECTION.service, {message: 'The service id is invalid'})
    serviceId: string |undefined;

    init(model: IEventServiceUpdate) {
        this.eventId = model.eventId
        this.serviceId = model.serviceId

        const m = {eventId: this.eventId, serviceId: this.serviceId } as { [key: string]: any }
        return Object.keys(m)
            .reduce((result: { [key: string]: any }, key) => {
                if (m[key] !== undefined) {
                    result[key] = m[key];
                }
                return result;
            }, {});
    }
}