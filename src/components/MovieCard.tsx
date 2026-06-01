import type { Movie } from '../types/movie';

//import { Link } from 'react-router-dom';
import { Card 
         //CardContent, CardDescription, CardHeader, CardTitle 
       } from '../components/ui/card'

import star from "../../src/assets/star.svg";
import { Link, useLocation } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  showDetails?: boolean;
}


function MovieCard( { movie, showDetails } : MovieCardProps) {
  const location = useLocation();
  
  // Cek apakah sedang di halaman movie-detail-page atau search
  const isDetailPage = location.pathname.startsWith('/movie-detail-page');
  const isSearchPage = location.pathname.startsWith('/search');

  const posterUrl =  `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // Tentukan kapan  info judul dan raing itu harus ditampilkan......
  // initinya di home, rekomendasi --> itu ditampilkan , tapi kalau icon awal di detail itu ga ditampilkan......
  const shouldShowDetails = showDetails !== undefined ? showDetails : (!isDetailPage && !isSearchPage);

  return (
    <div>
        
        <Card className="rounded-2xl overflow-hidden border-0 bg-transparent shadow-none 
                         hover:scale-105 transition-transform cursor-pointer">

          <Link to={`/movie-detail-page/${movie.id}`}>

            <img src = { posterUrl } alt={ movie.title }
                 className="w-full h-auto block object-cover rounded-2xl cursor-pointer"  />
                
          </Link>
        </Card>

        {/* Menampilkan judul & rating berdasarkan prop atau pengecekan halaman */}
        {shouldShowDetails && (
          
          <div className="flex flex-col px-1 mt-3">
              
              <h3 className="font-semibold text-neutral-25 truncate text-sm" title={movie.title}>
                  {movie.title}
              </h3>

              <div className="flex flex-row gap-1">
                  <img src={star} alt="Star" />
                  <p>{movie.vote_average.toFixed(1)}/10 </p>
              </div>

          </div>

        )}
    </div>
  )
}

export default MovieCard