import { ICollection } from "../collection.interface";
import { COLLECTION } from "../../data/default-collection-name"

const docs = [
    {
        createdAt: "2024-02-28T15:02:14.644Z",
        createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        updatedAt: "2024-02-28T15:02:30.158Z",
        updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        infos: "",
        name: "Mariage",
    },
    {
        createdAt: "2024-02-28T15:02:14.644Z",
        createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        infos: "",
        updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        name: "Sortie de Promotion",
        updatedAt: "2024-02-28T15:02:30.158Z"
    },
    {
        createdAt: "2024-02-28T15:02:14.644Z",
        createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        infos: "",
        updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        name: "Fincaille",
        updatedAt: "2024-02-28T15:02:30.158Z"
    },
    {
        createdAt: "2024-02-28T15:02:14.644Z",
        createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        infos: "",
        updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        name: "Baptême",
        updatedAt: "2024-02-28T15:02:30.158Z"
    },
    {
        createdAt: "2024-02-28T15:02:14.644Z",
        createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        infos: "",
        updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
        name: "Autre Evenement",
        updatedAt: "2024-02-28T15:02:30.158Z"
    },
]

export const categCollection : ICollection = {
    name: COLLECTION.categ,
    docs: docs
}


