'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { auth } from '../lib/auth'
import { db } from '../lib/firebase'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import path from 'path'

export async function createProject(formData: FormData) {
  const session = await auth()
  if (!session) return

  const profileId = formData.get('profileId') as string
  const projectName = formData.get('projectName') as string
  const projectDescription = formData.get('projectDescription') as string
  const projectUrl = formData.get('projectUrl') as string
  const file = formData.get('file') as File

  const generatedId = randomUUID()

  // Upload local simples
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const timestamp = Date.now()
  const fileExtension = path.extname(file.name)
  const uniqueFilename = `${generatedId}-${timestamp}${fileExtension}`

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  const filePath = path.join(uploadDir, uniqueFilename)

  // Criar diretório e salvar arquivo
  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, buffer)

  const imagePath = `/uploads/${uniqueFilename}`

  try {
    await db
      .collection('projects')
      .doc(profileId)
      .collection('projects')
      .doc()
      .set({
        userId: session.user?.id,
        projectName,
        projectDescription,
        projectUrl,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
