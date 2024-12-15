import { NextResponse } from 'next/server'

const API_KEY = "5713c1a1191884f7f6a81c60c1d730d8"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}&language=fr-FR`
  )
  const data = await res.json()
  return NextResponse.json(data)
} 