import {NextResponse} from 'next/server';

export async function GET() {
    const res= await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return NextResponse.json(data);
}