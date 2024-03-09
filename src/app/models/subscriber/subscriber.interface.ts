export interface ISubscriber {
    email: string,
    phone: string,
    serviceRefs: string[]
}

export interface ISubscriberUpdate {
    email?: string,
    phone?: string,
    serviceRefs?: string[]
}