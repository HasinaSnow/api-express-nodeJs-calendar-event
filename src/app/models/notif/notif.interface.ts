
export interface INotifMessage {
    type: string,
    subject: string,
    subjectId: string,
    author: string,
    createdAt: Date
} 

export interface ITargetStatus {
    send: boolean
}