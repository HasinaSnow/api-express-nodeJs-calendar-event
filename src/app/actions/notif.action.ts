import { Request } from "express"
import { SUBJECT } from "../data/default-collection-name"
import { ROLE_NAME } from "../data/default-role-name.data"
import { RoleUser } from "../models/role-user/role-user.model"
import { Role } from "../models/role/role.model"
import { User } from "../models/user/user.model"
import { NotifService } from "../services/notif.service"
import { getUidTokenInRequest } from "../utils/utils"
import { INotif } from "../models/notif/notif.interface"

export async function notifyAction(data: any, type: string, roleName: string, subject: string, subjectId: string, req: Request) {
    // dispacth notif
    const notif = new NotifService()
    const targets = await getNotifTargets(data, roleName, subject)
    const dataNotif = await getNotifData(subjectId, subject, type, req) 
    notif.dispatch(dataNotif, targets)
        .then(value => {
            notif.broadcast(value.notifId)
        })
}

async function getNotifTargets(data: any, roleName: string, subject: string) {
    const roleId = await (new Role().getIdByName(roleName))
    const roleAdminId = await (new Role().getIdByName(ROLE_NAME.admin))
    let targets = await (new RoleUser().getUserRefsByRoles([roleAdminId, roleId]))
    if(subject == SUBJECT.event) {
        const targetRefsByService: string[] = (await new User().getUserRefsByServices(data.serviceRefs as string[]))
        targets = [...targets, ...targetRefsByService]
    }
    return targets
}

async function getNotifData(subjectId: string, subject: string, type: string, req: Request): Promise<INotif> {
    return {
        type: type,
        subject: subject,
        subjectId: subjectId,
        author: await getUidTokenInRequest(req),
        createdAt: new Date()
    }
}