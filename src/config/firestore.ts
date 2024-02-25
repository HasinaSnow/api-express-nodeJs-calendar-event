import serviceAccount from './firestore.creds.json'
import * as admin from "firebase-admin" 

// init firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as object),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
})

// get db firestore
export const db = admin.firestore()
export const auth = admin.auth()
