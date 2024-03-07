export interface IEvent {
    date: string,
    infos?: string,
    categId: string,
    // serviceRefs: string[]
}
export interface IEventUpdate {
    date?: string,
    infos?: string,
    categId?: string,
    // serviceRefs?: string[]
}