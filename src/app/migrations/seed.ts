import { db } from '../config/firebaseConfig'
import { categCollection } from './seeders/categ.seed';
import { ICollection } from './collection.interface';
import { eventCollection } from './seeders/event.seed';
import { serviceCollection } from './seeders/service.seed';

// add
function addDocs(colName: string, docs: any[]) {
    const docsCount = docs.length
    let count: number = 0
     docs.forEach(doc => {
        db.collection(colName).add(doc)
            .then(result => {
                count++
                console.log(`___ADDED___${colName}--${result.id}`)
            })
        })
}

// fresh db
async function freshDocs(colName: string) {
    return db.collection(colName).listDocuments().then(docs => {
        if(docs.length === 0) {
            console.log(`____NO DOC TO REMOVED____`)
            return
        }
        docs.forEach(async doc => {
            await doc.delete()
            console.log(`___REMOVED___${colName}--${doc.id}`)
        });
    })
}

// seed datas
async function seed(collections: ICollection[]) {
    collections.forEach(async collection => {
        await freshDocs(collection.name)
        addDocs(collection.name, collection.docs)
    });
}

seed([ serviceCollection, categCollection, eventCollection ])
