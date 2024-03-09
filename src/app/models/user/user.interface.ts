export interface IUser {
    name: string,
    userRef: string,
    infos: string,
    serviceRefs: string[]
}

export interface IUserUpdate {
    name?: string,
    infos?: string,
    serviceRefs?: string[]
}