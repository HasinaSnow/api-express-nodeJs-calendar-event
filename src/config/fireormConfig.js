import * as admin from 'firebase-admin';
import serviceAccount from './firestore.creds.json' assert { type: "json" }
// import { serviceAccount } from './firestore.creds.js'
import * as fireorm from 'fireorm';

// const serviceAccount = require('./firestore.creds.json')
console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();

export const initFireorm = () => {
  fireorm.initialize(firestore);
} 
