import { ICollection } from "../collection.interface";
import { COLLECTION } from "../../data/default-collection-name"

const docs = [
    {
        isSuper: true,
        roleId: "Env0u4VBKF4WSlJygFWi",
        userId: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        createdAt: "2024-02-28T15:02:14.644Z",
        createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        updatedAt: "2024-02-28T15:02:30.158Z",
        updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    },
]

export const roleUserCollection : ICollection = {
    name: COLLECTION.roleUser,
    docs: docs
}


