export interface IUser {
    name: string,
    userRef: string,
    infos: string
}

export interface IUserUpdate {
    name?: string,
    infos?: string
}