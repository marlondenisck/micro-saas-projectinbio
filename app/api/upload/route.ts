import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json(
        { error: 'Nome do arquivo é obrigatório' },
        { status: 400 }
      )
    }

    const bytes = await request.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Nome único para evitar conflitos
    const timestamp = Date.now()
    const fileExtension = path.extname(filename)
    const baseName = path.basename(filename, fileExtension)
    const uniqueFilename = `${baseName}-${timestamp}${fileExtension}`
    
    // Diretório de uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, uniqueFilename)
    
    // Criar diretório se não existir
    await mkdir(uploadDir, { recursive: true })
    
    // Salvar arquivo
    await writeFile(filePath, buffer)
    
    // URL pública
    const publicUrl = `/uploads/${uniqueFilename}`

    return NextResponse.json({
      url: publicUrl,
      pathname: uniqueFilename,
      contentType: request.headers.get('content-type') || 'application/octet-stream',
    })

  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro no upload: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Salvar arquivo
    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${uniqueFilename}`

    return NextResponse.json({
      url: publicUrl,
      pathname: uniqueFilename,
      contentType: request.headers.get('content-type') || 'application/octet-stream',
    })
      contentType:
        request.headers.get('content-type') || 'application/octet-stream',
    })
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro no upload: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
