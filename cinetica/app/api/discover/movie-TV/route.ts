import { NextResponse } from 'next/server';

const API_KEY = "5713c1a1191884f7f6a81c60c1d730d8";

export async function GET() {
    const movieRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1`);
    const movieData = await movieRes.json();

    const tvRes = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=1`);
    const tvData = await tvRes.json();

    const combinedData = {
        movies: movieData,
        tvShows: tvData
    };

    return NextResponse.json(combinedData);
}
