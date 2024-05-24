import {
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_DATABASE_URL,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
} from '@/config'
import admin from 'firebase-admin'

export const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
})
