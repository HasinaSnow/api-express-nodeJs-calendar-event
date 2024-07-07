import { INotifMessage } from "../models/notif/notif.interface";
import { Notif } from "../models/notif/notif.model";
import { User } from "../models/user/user.model";
import { SocketService } from "./socket.service";

export type T_NotifType = "create" | "update" | "delete";

export class NotifService {
  userModel: User;
  notifModel: Notif;

  constructor() {
    this.userModel = new User();
    this.notifModel = new Notif();
  }

  /**
   * get all notifs by targets
   * @param string userId
   * @param boolean send
   * @return Promise<object[]>
   */
  async getAllByUser(userId: string, send: boolean = false): Promise<object[]|[]> {
    return this.notifModel.getByUser(userId, 50, undefined, send)
        .then(value => this.notifModel.formatView(value))
        .catch(error => error)
  }

  /**
   * broadcast the notif to all users ative concerned in socket
   * @param string notifId
   * @param object data : the data sended in client
   */
  async broadcast(notifId: string) {
    // get all sockets instance
    const socketRefs = await SocketService.getAllSocketRefs()
    const message = { id: notifId, ...(await this.notifModel.getById(notifId)).data()}

    // send notif for each socket where user is aprouved
    let socketRefsEmit: string[] = []
    for (let i = 0; i < socketRefs.length; i++) {
      // verify if userId is notifiable for the nofif Id
      const socket = socketRefs[i];
      const userId = socket.data.userId
      if (await this.notifModel.IsNotifiableAndNotEmit(userId, notifId)) {
          socketRefsEmit.push(socket.id)
          await this.changeNotifAsSended(userId, [notifId])
      }
    }
    // console.log('___socketRefsEmit___', socketRefsEmit)
    // broadcasst
    SocketService.emit('notifs', message, socketRefsEmit)
  }

  /**
   * dispatch notif for all specified targets (user)
   * @param INotifMessage message
   * @param string[] targets
   * @returns 
   */
  dispatch(message: INotifMessage, targets: string[]) {
    return this.notifModel.create(targets, message);
  }

  /**
   * change all notifs sended for user id
   * @param string userId
   * @param string[] notifRefs 
   * @returns Promise<FirebaseFirestore.WriteResult[]>
   */
  async changeNotifAsSended(userId: string, notifRefs: string[]) {
    return this.notifModel.updateNotifTargets(notifRefs, userId, { send: true})
  }
}
