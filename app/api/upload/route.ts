import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/app/lib/data'
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }
  
    const session = await getServerSession();
    const currentUserId = await getCurrentUserId(session);

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Define the correct path where you want to save the uploaded file
  const path = `./public/users/${currentUserId}.png` // Example: Save in the 'public/uploads' directory

  try {
    // Write the file to the filesystem
    await writeFile(path, buffer)
    console.log(`File saved at: ${path}`)
    return NextResponse.json({ success: true, path: path })
  } catch (error: any) {
    console.error('Error saving file:', error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
