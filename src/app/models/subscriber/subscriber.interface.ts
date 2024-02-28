export interface ISubscriber {
    email: string,
    phone: string,
    subscribeAt: Date|null
}

export interface ISubscriberUpdate {
    email?: string,
    phone?: string,
    subscribeAt?: Date
}