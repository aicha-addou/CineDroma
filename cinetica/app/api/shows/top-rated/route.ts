import { NextResponse } from 'next/server'

const API_KEY = "5713c1a1191884f7f6a81c60c1d730d8"

export async function GET() {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=fr-FR&page=1`
  )
  const data = await res.json()
  return NextResponse.json(data)
}