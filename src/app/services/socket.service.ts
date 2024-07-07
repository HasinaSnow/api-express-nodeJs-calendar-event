import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { User } from "../models/user/user.model";
import { socket } from "..";

export class SocketService {
    static async joinRooms(socketInstance: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, userId: string) {
        const user = new User()
        const serviceRefs = await user.getServiceRefs(userId)
        const roleRefs = await user.getRoleRefs(userId)
        socketInstance.join([...serviceRefs, ...roleRefs])
    }

    /**
     * get all user id for each socket instance
     * @returns string[]
     */
    static async getUserRefsByRoom(room: string|undefined = undefined) {
        // get all socket refs in rooms
        if(room) {
            const socketRefs = await socket.in(room).fetchSockets()
            // get all user id in data of each socket instance
            let userRefs: string[] = []
            socketRefs.forEach(s => {
                const data = socket.sockets.sockets.get(s.id)?.id
                if(data) userRefs.push(data)
            })
            return userRefs

        }
    }

    /**
     * fetch all sockets refs in the room specified
     * @param string room 
     * @returns Promise<RemoteSocket<DecorateAcknowledgementsWithMultipleResponses<DefaultEventsMap>, any>[]>
     */
    getSocketRefsByRoom(room: string) {
        return socket.in(room).fetchSockets()
    }

    /**
     * get all sockets instance
     * @param Promise<RemoteSocket<DefaultEventsMap, any>[]>
     */
    static async getAllSocketRefs() {
        return socket.fetchSockets()
    }

    /**
     * get all rooms active
     * @returns string[]
     */
    static getRooms() {
        return Object.keys(socket.sockets.adapter.rooms);
    }

    static emit(event: string, value: any, rooms: string[]|undefined = undefined) {
        if(rooms) socket.to(rooms).emit(event, value)
        else socket.emit(event, value)
    }

}