import { useMovieRecommendation } from '../../hooks/useMovies';
import MovieCard from '../MovieCard';

import type { Movie } from '../../types/movie';

interface RecommendationMovieProps {
  movieId: number | string;
}

function RecommendationMovie({ movieId }: RecommendationMovieProps) {
  const { data, isLoading, isError, error } = useMovieRecommendation(Number(movieId));

  if (isLoading) return (

    <div className="px-4 md:px-25 text-neutral-400">Loading recommendations...</div>

  );

  if (isError) return (
    
    <div className="px-4 md:px-25 text-red-500">
      Error: {error?.message}
    </div>

  );

  
  if (!data?.results?.length) return null;

  return (
    <div className="mt-10 md:px-25 pb-24">
      <h2 className="px-4 md:px-0 text-display-md font-bold pb-4 text-neutral-25">        
        Recommendations
      </h2>

      <div className="px-4 md:px-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        
          {data.results.slice(0, 5).map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} showDetails={true} />
          ))}
      
      </div>
    
    </div>
  );
}

export default RecommendationMovie;