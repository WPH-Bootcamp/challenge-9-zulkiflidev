import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';

import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie';

import Star from '../assets/star.svg'

import { Button } from '../components/ui/button'
import VideoPlayIcon from '../assets/icon-videoPlay.svg';


//import MovieFrameIcon from '../assets/movie-frame-icon.svg';


function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Menggunakan custom hook useSearchMovies yang sudah terintegrasi React Query
  const { data, isLoading, isError, error } = useSearchMovies(query);

  return (
    <div className="w-full relative px-4 md:px-25 pt-24 min-h-screen">

      <div className="text-display-md font-bold text-neutral-25 pb-4">
      
        <h2>Search Results for "{query}"</h2>
      
      </div>

      {isLoading ? <p className="text-neutral-400">Loading...</p> : null}
      
      {isError ? <p className="text-red-500">{error.message}</p> : null}

      {!isLoading && data?.results?.length === 0 && (

        
        <p className="text-neutral-400"> Data not found for keyword"{query} -- please try another keyword".</p>

      )}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 
                      pb-24 mt-8">
          {data?.results?.map((movieItem: Movie) => (

            <div key={movieItem.id} className="md:flex md:flex-row md:gap-4 md:justify-start md:items-start">
              
                  {/* Memastikan ukuran gambar sama semua poster movie,
                  krn ada yang besar dan kecil */}

              <div className="flex flex-row gap-4">
                <div className="w-32 sm:w-40 md:w-48 shrink-0">
                  
                  <MovieCard movie={movieItem} />
                </div>

                <div className="flex flex-col px-1 gap-4 mt-5">

                    <h3 className="font-semibold text-neutral-25 truncate text-xl" title={movieItem.title}>
                      {movieItem.title}
                    </h3>
                
                    <div className="flex flex-row gap-1">
                        <img src={Star} alt="Star" />
                        <p>{movieItem.vote_average.toFixed(1)}/10 </p>
                    </div>

                    <h3 className="text-neutral-400 text-sm line-clamp-3 md:line-clamp-none">{movieItem.overview}</h3>

                    <div className="hidden md:flex md:flex-row gap-4 mt-4 ">

                      <Button className="bg-primary-300 rounded-2xl h-12 w-full md:w-1/4 cursor-pointer">
                          <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                      
                          <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>

                      </Button>
                    </div>

                </div>

              </div>  
              
              {/* ini untuk tampilan mobile, kan button nya di bawah posternya, ya gitulah.... */}
              <div className="flex flex-row gap-4 mt-4 sm:w-8/10 md:hidden ">
                <Button className="bg-primary-300 rounded-2xl h-12 w-full md:w-1/4 cursor-pointer">

                    <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                      
                    <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                </Button>
              </div>    
            </div>

          ))}
      </div>
    </div>

  )
}

export default SearchPage