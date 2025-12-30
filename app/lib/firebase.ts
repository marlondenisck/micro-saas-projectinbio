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

// Função para URLs locais (sem Google Storage)
export async function getDownloadURLFromPath(path?: string) {
  if (!path) return

  // Se já é uma URL local completa, retorna ela mesma
  if (path.startsWith('/uploads/')) {
    return path
  }

  // Se é um path antigo do Firebase, converte para local
  if (path.includes('project-images/')) {
    // Extrai apenas o nome do arquivo
    const fileName = path.split('/').pop()
    return `/uploads/${fileName}`
  }

  // Fallback: assume que é um nome de arquivo
  return `/uploads/${path}`
}
