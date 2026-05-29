// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  // TODO: Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.
  
  /*
    Example response from API --> 1) Popular Movies

    "adult": false,
    "backdrop_path": "/wMrV8SLne1jHLeYS0lLrA1Tf86P.jpg",
    "genre_ids": [
        27,
        9648
    ],
    "id": 1304313,
    "title": "Lee Cronin's The Mummy",
    "original_language": "en",
    "original_title": "Lee Cronin's The Mummy",
    "overview": "The young daughter of a journalist disappears into the desert without a trace—eight years later, the broken family is shocked when she is returned to them, as what should be a joyful reunion turns into a living nightmare.",
    "popularity": 710.3831,
    "poster_path": "/uIb9Tvae5haF0XcQBaPyufmxbb0.jpg",
    "release_date": "2026-04-15",
    "softcore": false,
    "video": false,
    "vote_average": 8.002,
    "vote_count": 1020
  */

    id: number;      
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    softcore: boolean;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieResponse {
  // TODO: Add pagination properties
  // Examples: page, results, total_pages, total_results
}

// TODO: Add more types as needed (Genre, Video, etc.)
