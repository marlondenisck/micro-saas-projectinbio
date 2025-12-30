'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { auth } from '../lib/auth'
import { db } from '../lib/firebase'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import path from 'path'

export async function createProject(formData: FormData) {
  try {
    console.log('🚀 Iniciando createProject...')

    const session = await auth()
    if (!session) {
      console.log('❌ Sem sessão de usuário')
      return false
    }

    const profileId = formData.get('profileId') as string
    const projectName = formData.get('projectName') as string
    const projectDescription = formData.get('projectDescription') as string
    const projectUrl = formData.get('projectUrl') as string
    const file = formData.get('file') as File

    console.log('📋 Dados recebidos:', {
      profileId,
      projectName,
      projectDescription,
      projectUrl,
      fileName: file?.name,
      fileSize: file?.size,
    })

    if (!file || file.size === 0) {
      console.log('❌ Nenhum arquivo recebido')
      return false
    }

    const generatedId = randomUUID()

    // Upload local simples
    console.log('📁 Fazendo upload do arquivo...')
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

    console.log('✅ Arquivo salvo em:', filePath)

    const imagePath = `/uploads/${uniqueFilename}`

    // Salvar no Firestore
    console.log('💾 Salvando no Firestore...')
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

    console.log('✅ Projeto salvo com sucesso!')
    return true
  } catch (error) {
    console.error('❌ Erro no createProject:', error)
    return false
  }
}
