export interface IRoleUser {
    userId: string,
    roleId: string,
    isSuper?: boolean
}

export interface IRoleUserUpdate {
    userId?: string,
    roleId?: string,
    isSuper?: boolean
}
