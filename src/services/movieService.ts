import api from '@/lib/axios';
// import { Movie, MovieResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

/**
 * Fungsi untuk mendapatkan Film yang lagi populer...
 * hanya pae 1 saja
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
 * Fungsi mencari film....
 * Page One saja, ga usah banyak banyak dah...capek buatnya :D
 * @param page 
 */
export const getSearchMovies = async (query: string, page = 1) => {
  try{
    const response = await api.get('/search/movie', {
      params: {
        page,query
      },
    });
    
    //buat debug
    ////console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};








/**
 * Fungsi untuk mendapatkan Now Playing Movies dan bisa diambil per page
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


/**
 * Fungsi untuk mendapatkan Daftar Rekomendasi Movier berdasarkan rating 
 *  dan seberapa populer suatu movie...
 * @param page 
 */
export const getMovieRecommendations = async (id: number) => {
  try{
    const response = await api.get(`/movie/${id}/recommendations`, {
      
    });
    
    //buat debug, nanti diubah......
    //console.log(response.data);   //buat test error 
    return response.data;
  }
  catch(error){
    console.error(error); //error sudah banyak diinspect....belum dirapihin....
  }
};



/**
 * Fungsi untuk mendapatkan film yang mirip berdasarkan genre dan keyword...
 */
export const getMovieSimiliar = async (id: number) => {
  try{
    const response = await api.get(`/movie/${id}/similiar`, {
      
    });
    
    //buat debug, nanti diubah......
    //console.log(response.data);    
    return response.data;
  }
  catch(error){
    console.error(error);  
  }
};



/**
 * Fungsi untuk mendapatkan Video Trailer
 * @param page 
 */
export const getMovieTrailer = async (id: number) => {
  try{
    const response = await api.get(`/movie/${id}/videos`, {
      
    });
    
    //barangkali berguna buat debug.....
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
  //fetchNowPlayingMovies ---> gak perlu ga sih
  

  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing

  getNowPlayingMovies,


  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}

  getMovieDetails,

  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie

  getSearchMovies,


  // TODO: Add more endpoints as needed
  //jadi di bawah ini fungsi lain2nya....ya gitulah...

  getMovieCasts,
  getMovieTrailer,
  getMovieRecommendations,
  getMovieSimiliar,
  
};



