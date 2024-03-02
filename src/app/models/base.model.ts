import { isArray } from "class-validator"


export interface ModelMethods {
    create(newData: any): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>,
    getAll(): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[]>,
    getOne(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>,
    update(id: string, newData: any): Promise<FirebaseFirestore.WriteResult>,
    delete(id: string): Promise<FirebaseFirestore.WriteResult>
    exists(id: string): Promise<Boolean>
}

export abstract class BaseModel implements ModelMethods {

    constructor(
        public collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>
    ) {}

    async create(newData: any): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        return await this.collection.add(newData)
    }

    async getAll(): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[]> {
        return (await this.collection.get()).docs
    }

    async getOne(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
        return await this.collection.doc(id).get()
    }

    async update(id: string, newData: any): Promise<FirebaseFirestore.WriteResult> {
        return await this.collection.doc(id).update(newData)
    }

    async delete(id: string): Promise<FirebaseFirestore.WriteResult> {
        return await this.collection.doc(id).delete()
    }

    async exists(id: string): Promise<Boolean> {
        return (await this.getOne(id)).exists
    }

    async isCreatedBy(id: string, userId: string) {
        return this.collection.doc(id).get()
            .then(data => data.get('createdBy') == userId)
    }

    async isUpdatedBy(id: string, userId: string) {
        return this.collection.doc(id).get()
            .then(data => data.get('updatedBy') == userId)
    }

}