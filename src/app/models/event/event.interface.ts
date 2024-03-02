export interface IEvent {
    date: Date,
    infos?: string,
    categId: string,
    serviceRefs: string[]
}
export interface IEventUpdate {
    date?: Date,
    infos?: string,
    categId?: string,
    serviceRefs?: string[]
}