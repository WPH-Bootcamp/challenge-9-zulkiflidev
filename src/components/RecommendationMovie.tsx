import { useMovieRecommendation } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface RecommendationMovieProps {    
  movieId: number | string;
}

function RecommendationMovie({ movieId }: RecommendationMovieProps) {

  const numericMovieId = Number(movieId);
  const { data, 
          isLoading, 
        isError, 
        error 
        } = useMovieRecommendation(numericMovieId);

  if (isLoading) {
    return <div className="px-4 md:px-25 text-neutral-400">Loading recommendations...</div>;
  }

  if (isError) {
    return <div className="px-4 md:px-25 text-red-500">Error fetching recommendations: {error?.message}</div>;
  }

  if (!data?.results || data.results.length === 0) {
    return null; // Sembunyikan jika tidak ada rekomendasi
  }

  return (
    <div className="mt-10 md:px-25 pb-24">
      
      <h2 className="px-4 md:px-0 text-display-md font-bold 
                    pb-4 text-neutral-25">Recommendations
      </h2>
      
      <div className="px-4 md:px-0 grid grid-cols-2 md:grid-cols-4 
                      lg:grid-cols-5 gap-6">
        
            {/* cuma ambil 5 rekomendasi saja, biar ga kebanyakan....*/}
            {data.results.slice(0, 5).map((movie: Movie) => (
            
                <MovieCard key={movie.id} movie={movie} showDetails={true} />
           
            ))}

      </div>
    </div>
  );
}

export default RecommendationMovie;