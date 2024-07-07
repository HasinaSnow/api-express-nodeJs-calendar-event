import { ICollection } from "../collection.interface";
import { COLLECTION } from "../../data/default-collection-name";

const docs = [
  {
    createdAt: "2024-02-28T15:02:14.644Z",
    createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    updatedAt: "2024-02-28T15:02:30.158Z",
    updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    date: "2024-02-22T17:09:45.368",
    categId: "FWhtwLyPy3QEewQEJKHQ",
    infos: ""
  },
  {
    createdAt: "2024-02-28T15:02:14.644Z",
    createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    updatedAt: "2024-02-28T15:02:30.158Z",
    date: "2024-02-8T17:09:45.368",
    categId: "FWhtwLyPy3QEewQEJKHQ",
    infos: ""
  },
  {
    createdAt: "2024-02-28T15:02:14.644Z",
    createdBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    updatedBy: "MzgZZ0VZckegcNF8czsQ67tFswR2",
    updatedAt: "2024-02-28T15:02:30.158Z",
    date: "2024-02-15T17:09:45.368",
    categId: "FWhtwLyPy3QEewQEJKHQ",
    infos: ""
  }
];

export const eventCollection: ICollection = {
  name: COLLECTION.event,
  docs: docs,
};
