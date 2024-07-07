import { db } from "../../config/firebaseConfig"
import { COLLECTION } from "../../data/default-collection-name"
import { INotifMessage, ITargetStatus } from "./notif.interface"

export class Notif {
    collection = db.collection(COLLECTION.notif)
    constructor() {
    }

    /**
     * get all notifs for specified id
     * @param string userId
     * @param number limit
     * @param Date|undefined lastFieldValue the field name is specified in orderBy
     * @param boolean|undefined read 
     * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>
     */
    async getByUser(userId: string, limit: number, lastFieldValue: Date|undefined, read: boolean|undefined = undefined) {
        const notif = await this.collection.get()
        const resultDocuments: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] = [];
        // Traitement des résultats
        for (const doc of notif.docs) {
            const targets = await doc.ref.collection(COLLECTION.notifTargets).doc(userId).get()
                // .where('userId', '==', userId)
                // .where('read', '==', read)
                // .get();
            if (targets.exists && targets.data()?.send == false) resultDocuments.push(doc);
        }
        return resultDocuments
    }

    /**
     * create the notif fot all specified userRefs and make read: false
     * @param string[] userRefs
     * @param INotif data
     * @returns
     */
    async create(userRefs: string[], message: INotifMessage) {
        const batch = db.batch()

        return this.collection.add(message)
            .then(async result => {
                for(let id of userRefs) {
                    const target = result.collection(COLLECTION.notifTargets).doc(id)
                    batch.set(target, { send: false })
                }
                return batch.commit()
                    .then(r => {
                        return { notifId: result.id, result: r }
                    })
            })
    }

    /**
     * format the documents to view
     * @param docs 
     * @returns 
     */
    formatView(docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[]) {
        let data: any[] = []
        docs.map(doc => {
            data.push({id: doc.id, ...doc.data()})
        })
        return data
    }

    /**
     * update the specified notif for the specified target
     * @param string notifId
     * @param string userId 
     * @param ITargetStatus status 
     * @returns 
     */
    updateNotifTargets(notifRefs: string[], userId: string, status: ITargetStatus) {
        const batch = db.batch()
        for(let notifId of notifRefs) {
            const target = this.collection.doc(notifId).collection(COLLECTION.notifTargets).doc(userId)
            batch.update(target, { send: true })
        }
        return batch.commit()
    }

    /**
     * verify if the user id specified is notifiable for the notification id specified
     * @param string userId
     * @param string notifId 
     * @returns 
     */
    async IsNotifiableAndNotEmit(userId: string, notifId: string) {
        const target = (await this.collection.doc(notifId).collection(COLLECTION.notifTargets).doc(userId).get())
        if(!target.exists) return false
        return !target.get('send')
    }

    /**
     * get the notification document by id
     * @param string id  notificatin id
     * @returns Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>
     */
    async getById(id: string) {
        return this.collection.doc(id).get()
    }

}