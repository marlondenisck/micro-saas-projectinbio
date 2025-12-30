import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
// Removido getStorage - agora usando Vercel Blob
import 'server-only'

// Certifcado
const decodedKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY!,
  'base64'
).toString('utf-8')

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
})

// Instancia do app
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    // Removido storageBucket - agora usando Vercel Blob
  })
}

export const db = getFirestore()

// Comentado - agora usando Vercel Blob para storage
// export const storage = getStorage().bucket()
