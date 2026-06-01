import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';
import { useMovieStore } from '../store/movieStore';

import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie';

import Star from '../assets/star.svg'

import { Button } from '../components/ui/button'
import VideoPlayIcon from '../assets/icon-videoPlay.svg';
import HeartIcon from '../assets/heart-icon.svg';
import HeartIconFilled from '../assets/heart-icon-filled.svg';
import { motion } from 'framer-motion';

//import MovieFrameIcon from '../assets/movie-frame-icon.svg';


function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Menggunakan custom hook useSearchMovies yang sudah terintegrasi React Query
  const { data, isLoading, isError, error } = useSearchMovies(query);

  const { addFavorite, removeFavorite, isFavorite: checkIsFavorite } = useMovieStore();

  const handleFavoriteClick = (movieItem: Movie) => {

    if (checkIsFavorite(movieItem.id)) {
        removeFavorite(movieItem.id);
    } 
    else {
      addFavorite({
        id: movieItem.id,
        title: movieItem.title || '',
        overview: movieItem.overview || '',
        vote_average: movieItem.vote_average || 0,
        poster_path: movieItem.poster_path || ''
      });
    }
  };

  return (
    <motion.div 
      className="w-full relative px-4 md:px-25 pt-6 md:pt-8 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

{/*
      <div className="text-display-md font-bold text-neutral-25 pb-4">
      
        <h2>Search Results for "{query}"</h2>
      
      </div>
*/}
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full 
                         animate-spin"></div>
        </div>
      ) : null}
      
      {isError ? <p className="text-red-500">{error.message}</p> : null}

      {!isLoading && data?.results?.length === 0 && (

        
        <p className="text-neutral-400"> Data not found for keyword"{query} -- please try another keyword".</p>

      )}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 pb-24 mt-4">
          {data?.results?.map((movieItem: Movie) => (

            <motion.div 
              key={movieItem.id} 
              className="md:flex md:flex-row md:gap-4 md:justify-start md:items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              
                  {/* Memastikan ukuran gambar sama semua poster movie,
                  krn ada yang besar dan kecil */}

              <div className="flex flex-row gap-4 w-full">
                <div className="w-32 sm:w-40 md:w-48 shrink-0">
                  
                  <MovieCard movie={movieItem} />
                </div>

                <div className="flex flex-col px-1 gap-4 mt-5 flex-1 min-w-0">

                    <h3 className="font-semibold text-neutral-25 truncate text-xl" title={movieItem.title}>
                      {movieItem.title}
                    </h3>
                
                    <div className="flex flex-row gap-1">
                        <img src={Star} alt="Star" />
                        <p>{movieItem.vote_average.toFixed(1)}/10 </p>
                    </div>

                    <h3 className="text-neutral-400 text-sm line-clamp-3 md:line-clamp-5">{movieItem.overview}</h3>

                    <div className="hidden md:flex flex-row gap-4 mt-4 items-center">

                      <Button className="bg-primary-300 rounded-2xl h-12 w-full md:w-56 cursor-pointer hover:scale-105
                                          transition-transform">
                          <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                      
                          <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                      </Button>

                      <Button className="flex bg-black rounded-full shrink-0 w-12 h-12 border-1 border-neutral-900  justify-center
                                         items-center cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => handleFavoriteClick(movieItem)}>
                          {checkIsFavorite(movieItem.id) ? (
                            <img src={HeartIconFilled} className="w-6 h-6" alt="Favorite" />
                          ) : (
                            <img src={HeartIcon} className="w-6 h-6" alt="Not Favorite" />
                          )}
                      </Button>
                    </div>

                </div>

              </div>  
              
              {/* ini untuk tampilan mobile, kan button nya di bawah posternya, ya gitulah.... */}
              <div className="flex flex-row gap-4 mt-4 w-full md:hidden items-center">
                
                
                <Button className="bg-primary-300 rounded-2xl h-12 flex-1 cursor-pointer hover:scale-105 transition-transform">

                    <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                      
                    <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                </Button>

                <Button className="flex bg-black rounded-full shrink-0 w-12 h-12 border-1 border-neutral-900
                                  justify-center items-center cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => handleFavoriteClick(movieItem)}>

                    {checkIsFavorite(movieItem.id) ? (
                      <img src={HeartIconFilled} className="w-6 h-6" alt="Favorite" />
                    ) 
                    : 
                    (
                      <img src={HeartIcon} className="w-6 h-6" alt="Not Favorite" />
                    )}

                </Button>

              </div>    
            </motion.div>

          ))}
      </div>

    </motion.div>

  )
}

export default SearchPage