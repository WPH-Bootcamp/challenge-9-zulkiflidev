import api from '@/lib/axios';
// import { Movie, MovieResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

/**
 * Fungsi untuk mendapatkan Film yang lagi populer...
 * @param page 
 */
export const getPopularMovies = async (page = 1) => {
  try{
    const response = await api.get('/movie/popular', {
      params: {
        page,
      },
    });
    
    //buat debug
    //console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};

/**
 * Fungsi untuk mendapatkan Film yang lagi populer...
 * @param page 
 */
export const getNowPlayingMovies = async (page: number) => {
  try{
    const response = await api.get('/movie/now_playing', {
      params: {
        page,
        limit: 12
      },
    });
    
    //buat debug
    //console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};



/**
 * Fungsi untuk mendapatkan Detail Film...
 * @param page 
 */
export const getMovieDetails = async (id: number) => {
  try{
    const response = await api.get(`/movie/${id}`, {
      
    });
    
    //buat debug
    //console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};

/**
 * Fungsi untuk mendapatkan Daftar Cast/Credit suatu film
 * @param page 
 */
export const getMovieCasts = async (id: number) => {
  try{
    const response = await api.get(`/movie/${id}/credits`, {
      
    });
    
    //buat debug
    //console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};


export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  getPopularMovies,
  getNowPlayingMovies,
  getMovieDetails,
  getMovieCasts,
  
  
  //fetchNowPlayingMovies ---> gak perlu ga sih


  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing

  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}

  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie

  // TODO: Add more endpoints as needed
};
