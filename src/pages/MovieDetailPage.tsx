import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import FeaturedCard from '@/components/FeaturedMovieCard'
import { useMovieDetails, useMovieCasts  } from '../hooks/useMovies';
import RecommendationMovie from '../components/RecommendationMovie';
import type { Cast  } from '../types/cast';

function MovieDetailPage() {
  // Menangkap parameter 'id' dari URL
  const { id } = useParams<{ id: string }>();

  // Scroll ke posisi paling atas saat halaman pertama kali dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // id dijadikan dependency agar saat navigasi antar film, tetap scroll ke atas

  //==Movie Details
  const numericMovieId = id ? Number(id) : 0;
  const { data:movieDetailsData, 
        isLoading:movieDetailsIsLoading, 
        isError:movieDetailsIsError, 
        error:movieDetailsError  } = useMovieDetails(numericMovieId);          

  // Tampilkan pesan error jika terjadi masalah saat mengambil data
  if (movieDetailsIsError) return <div className="p-24 text-white">Oops, terjadi kesalahan: {movieDetailsError?.message}</div>;

  //==Movie Casts
  const { data:movieCastsData, 
        isLoading:movieCastsIsLoading, 
        isError:movieCastsIsError, 
        error:movieCastsError  } = useMovieCasts(numericMovieId);       
        
  // Tampilkan pesan error jika terjadi masalah saat mengambil data
  if (movieCastsIsError) return <div className="p-24 text-white">Oops, terjadi kesalahan: {movieCastsError?.message}</div>;



  return (
    <div>
      <div className="relative -mt-24 flex flex-col gap-8">
          <FeaturedCard movieId={id} />

          {/* Overview */}
          <div className="mt-45 px-4 text-neutral-200 md:mt-40 md:px-25">

            <h2 className="text-display-md font-bold pb-4">Overview</h2>
            <p className="text-lg text-neutral-400">{!movieDetailsIsLoading && movieDetailsData?.overview}</p>
          
          </div>

          <div className="mt-10 md:px-25">
            <h2 className="px-4 md:px-0 text-display-md font-bold pb-4 text-neutral-25">Cast & Crew</h2>
            
            <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">

              {/* Filter Data Cast Member, hanya untuk yang memiliki properti "character" */}
              {/* so, Jadi datanya --> difilter ---> (khusus artisnya saja) ---> dimap ---> buka data ---> tempel di element, gitulah.... */} 
              {/* sehingga yang bagian teknis, gak ditampilin  di sini....jadi khusus artis/pemeran nya saja yang bener-bener main aja */}
              
              {!movieCastsIsLoading && 
                  movieCastsData?.cast?.filter((cast: Cast) => 
                      cast.character).map((cast: Cast) => (
                
                <div key={cast.id} className="flex flex-row gap-4 py-1 justify-start">

                    {/* Foto profile yang ga ada, jadinya diambil dari ui-avatars.com pake nama inisial jadi ga ngeblank gitu ajah... */}    
                    <img 
                      src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : `https://ui-avatars.com/api/?name=${cast.name}&background=171717&color=737373&size=185`} 
                      alt={cast.name} 
                      className="w-15 h-auto object-cover block rounded-lg" />

                    <div className="flex flex-col mt-3 justify-start items-start gap-0">

                      <h3 className="font-bold text-md text-neutral-25 ">{cast.name}</h3>
                      <p className="text-neutral-400 text-md">{cast.character}</p>
                    
                    </div>

                </div>

              ))}
            </div>
          </div>

          <RecommendationMovie movieId={numericMovieId} />
        
      </div>
    </div>
  )
}

export default MovieDetailPage