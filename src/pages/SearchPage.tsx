import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';

import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie';

import Star from '../assets/star.svg'

import { Button } from '../components/ui/button'
import VideoPlayIcon from '../assets/icon-videoPlay.svg';


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

      {isLoading && <p className="text-neutral-400">Loading data...</p>}

      {isError && <p className="text-red-500">Error: {error.message}</p>}
      
      {!isLoading && data?.results?.length === 0 && (

        <p className="text-neutral-400">Tidak ada film yang ditemukan untuk "{query}".</p>
      
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 
                      pb-24 mt-8">
          {data?.results?.map((movieItem: Movie) => (

            <div className="flex flex-row gap-4 justify-start items-start">
              
              <div className="flex w-128 h-auto">
                <MovieCard key={movieItem.id} movie={movieItem} />
              </div>

              <div className="flex flex-col px-1 gap-4 mt-5">

                  <h3 className="font-semibold text-neutral-25 truncate text-xl" title={movieItem.title}>
                    {movieItem.title}
                  </h3>
              
                  <div className="flex flex-row gap-1">
                      <img src={Star} alt="Star" />
                      <p>{movieItem.vote_average.toFixed(1)}/10 </p>
                  </div>

                  <h3 className="text-neutral-400 text-sm">{movieItem.overview}</h3>

                  <div className="flex flex-row gap-4 mt-4 ">

                    <Button className="bg-primary-300 rounded-2xl h-12 w-1/4 cursor-pointer">
                        <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                      
                        <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>

                    </Button>
                  </div>

              </div>
            </div>

          ))}
      </div>
    </div>

  )
}

export default SearchPage