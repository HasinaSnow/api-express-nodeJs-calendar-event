export interface IEvent {
    date: Date,
    infos?: string,
    categId: string
}
export interface IEventUpdate {
    date?: Date,
    infos?: string,
    categId?: string
}