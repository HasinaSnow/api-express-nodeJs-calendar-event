import { Socket } from "socket.io"
import { socket } from "."
import { NotifService } from "./services/notif.service"
import { getUidToken } from "./utils/utils"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

/**
 * notify the instance of the socket connected
 * @param socket instance of socket connected
 * @param token 
 */
export async function notifChannel(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, uid: string) {
    let notifs: any[] = []
    const notifService = new NotifService()
    try {
      // send notifs for user token
      notifs = await notifService.getAllByUser(uid, false)
      const notifRefs: string[] = notifs.map(notif => notif.id)
      if(notifs.length > 0)
        if(socket.emit('notifs', notifs))
           await notifService.updateNotifSended(uid, notifRefs)

    } catch (error: any) {
      // send error
      socket.emit('error sending notification', error.message)
    }
}