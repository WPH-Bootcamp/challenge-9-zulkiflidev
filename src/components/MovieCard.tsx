import type { Movie } from '../types/movie';
//import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

import star from "../../src/assets/star.svg";
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie
}


function MovieCard( { movie } : MovieCardProps) {

  const posterUrl =  `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div>
        
        <Card className="rounded-2xl overflow-hidden border-0 bg-transparent shadow-none">

          <Link to={`/movie-detail-page/${movie.id}`}>
            <img src = { posterUrl } alt={ movie.title }
                 className="w-full h-auto block object-cover rounded-2xl cursor-pointer"  />
                
          </Link>
        </Card>

        {!movie.id ? 
          <div className="flex flex-col px-1">
              <h3 className="font-semibold text-neutral-25 truncate text-sm" title={movie.title}>
                  {movie.title}
              </h3>
              <div className="flex flex-row gap-1">
                  <img src={star} alt="Star" />
                  <p>{movie.vote_average.toFixed(1)}/10 </p>
              </div>
          </div>
          :
          <div></div>
        } 
    </div>
  )
}

export default MovieCard