export interface ModelMethods {
    create(newData: any): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>,
    getAll(limit: number, lastFieldValue: Date): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>,
    getOne(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>,
    update(id: string, newData: any): Promise<FirebaseFirestore.WriteResult>,
    delete(id: string): Promise<FirebaseFirestore.WriteResult>
    exists(id: string): Promise<Boolean>
}

export abstract class BaseModel implements ModelMethods {

    constructor(
        public collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>
    ) {}

    create(newData: any): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        return this.collection.add(newData)
    }

    getAll(limit: number, lastFieldValue: Date|undefined): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        let collection = this.collection
            .orderBy('createdAt', 'desc')
            .limit(limit)
        if(lastFieldValue !== undefined)
            collection = collection
                .startAfter(lastFieldValue)
        return collection.get()
    }

    getOne(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        return this.collection.doc(id).get()
    }

    update(id: string, newData: any): Promise<FirebaseFirestore.WriteResult> {
        return this.collection.doc(id).update(newData)
    }

    delete(id: string): Promise<FirebaseFirestore.WriteResult> {
        return this.collection.doc(id).delete()
    }

    async exists(id: string): Promise<Boolean> {
        return (await this.getOne(id)).exists
    }

    isCreatedBy(id: string, userId: string) {
        return this.collection.doc(id).get()
            .then(data => data.get('createdBy') == userId)
    }

    isUpdatedBy(id: string, userId: string) {
        return this.collection.doc(id).get()
            .then(data => data.get('updatedBy') == userId)
    }

    formatView(docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[]) {
        let data: any[] = []
        docs.map(doc => {
            data.push({id: doc.id, ...doc.data()})
        })
        return data
    }

}