'use client'

import { useState } from 'react'
import Button from './button'

interface UploadResponse {
  url: string
  pathname: string
  contentType: string
}

interface FileUploadProps {
  onUploadComplete?: (url: string) => void
  acceptedTypes?: string
  maxSize?: number // em MB
}

export default function FileUpload({
  onUploadComplete,
  acceptedTypes = 'image/*,.pdf,.doc,.docx',
  maxSize = 10,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  const validateFile = (file: File) => {
    // Validar tamanho (converter MB para bytes)
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `Arquivo muito grande. Máximo ${maxSize}MB`
    }
    return null
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      return
    }

    setFile(selectedFile)
    setError('')
    setUploadedUrl('')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Selecione um arquivo primeiro')
      return
    }

    try {
      setUploading(true)
      setError('')

      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: 'POST',
          body: file,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro no upload')
      }

      const blob: UploadResponse = await response.json()
      setUploadedUrl(blob.url)

      // Callback para o componente pai
      if (onUploadComplete) {
        onUploadComplete(blob.url)
      }
    } catch (error) {
      console.error('Erro:', error)
      setError(error instanceof Error ? error.message : 'Erro no upload')
    } finally {
      setUploading(false)
    }
  }

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }
    return null
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️'
    if (file.type.includes('pdf')) return '📄'
    if (file.type.includes('doc')) return '📝'
    return '📎'
  }

  return (
    <div className='flex flex-col gap-4 rounded-lg border bg-white p-4'>
      <h3 className='text-lg font-semibold'>Upload de Arquivo</h3>

      {/* Input de arquivo */}
      <input
        type='file'
        onChange={handleFileSelect}
        className='cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100'
        accept={acceptedTypes}
        disabled={uploading}
      />

      {/* Preview do arquivo selecionado */}
      {file && (
        <div className='flex items-center gap-4 rounded border bg-gray-50 p-3'>
          {getFilePreview(file) ? (
            <img
              src={getFilePreview(file)!}
              alt='Preview'
              className='h-16 w-16 rounded object-cover'
            />
          ) : (
            <div className='flex h-16 w-16 items-center justify-center rounded bg-gray-200 text-2xl'>
              {getFileIcon(file)}
            </div>
          )}
          <div className='flex-1'>
            <p className='text-sm font-medium'>{file.name}</p>
            <p className='text-xs text-gray-500'>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}

      {/* Botão de upload */}
      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className='w-fit'
      >
        {uploading ? 'Enviando...' : 'Fazer Upload'}
      </Button>

      {/* Mensagem de erro */}
      {error && (
        <div className='rounded border border-red-200 bg-red-50 p-3'>
          <p className='text-sm text-red-700'>{error}</p>
        </div>
      )}

      {/* Sucesso do upload */}
      {uploadedUrl && (
        <div className='rounded border border-green-200 bg-green-50 p-3'>
          <p className='mb-2 text-sm text-green-700'>
            ✅ Arquivo enviado com sucesso!
          </p>
          <a
            href={uploadedUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm break-all text-blue-600 hover:underline'
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  )
}
