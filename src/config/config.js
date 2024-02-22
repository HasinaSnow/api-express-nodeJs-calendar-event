import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebaseConfig.js';

// init app's firebase
const app = initializeApp(firebaseConfig);

// firestore database
export const db = getFirestore(app);

// users collection 
export async function users(db) {
    // const userCollection = collection(db, 'users');
    // const citySnapshot = await getDocs(userCollection);
    // const users = citySnapshot.docs.map(doc => doc.data());

    return 'all users';
  }

// const User = db.collection("Users");

