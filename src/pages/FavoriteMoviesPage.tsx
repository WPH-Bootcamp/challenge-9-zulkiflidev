import { useMovieStore } from '../store/movieStore';
import { Link } from 'react-router-dom';

//import { useMovieDetails  } from '../hooks/useMovies';
import { Button } from '../components/ui/button';
import { useMovieTrailer  } from '../hooks/useMovies';
import { useState } from 'react'
import { motion } from 'framer-motion';

import VideoPlayIcon from '../assets/icon-videoPlay.svg';
import HeartIconFilled from '../assets/heart-icon-filled.svg';
import CloseIcon from '../assets/close-icon.svg';

import Star from '../assets/star.svg'
import MovieFrameIcon from '../assets/movie-frame-icon.svg';



function FavoriteMoviesPage() {

  //=====Handle Video Trailer

  // State untuk menyimpan ID film yang sedang diklik trailernya
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  
  // Fetch trailer berdasarkan ID yang dipilih dari state
  const { data:movieTrailerData } = useMovieTrailer(selectedMovieId || 0);       
  
  //kan ada tombol "Watch Trailer" --> jadilah harus disediakan video trailernya
  const trailerVideo = movieTrailerData?.results?.find((vid: any) => vid.type === 'Trailer' 
                       && vid.site === 'YouTube') || movieTrailerData?.results?.[0];
                       
  const trailerKey = trailerVideo?.key;

    // Fungsi ketika tombol watch trailer diklik
  const handleWatchTrailer = (movieId: number) => {

    setSelectedMovieId(movieId);
    setShowTrailer(true);

  };

  
  //====Handle Favorite Movie

  // kita ambil statenya dari zustand....
  // Jangan lupa panggil removeFavorite juga agar kita bisa menghapus datanya
  const { favorites, removeFavorite } = useMovieStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <div className="relative flex flex-col gap-8 text-white px-4 py-4 mb-30 md:py-6 md:px-25">

          <div className="text-display-lg font-bold">Favorites</div>

            {favorites.length === 0 ? (

              <div className="flex flex-col items-center justify-center mt-20  gap-4">

                <img src={MovieFrameIcon} className="w-32 h-32 opacity-50 mb-4" />

                <h2>Data Empty</h2>
                <p className="text-neutral-400 text-xl">You don't have a favorite movie yet</p>
                
                <Link to="/" className="bg-primary-300 text-white px-6 py-3 rounded-full  text-md font-semibold
                                         hover:bg-primary-400 transition-colors">
                  Explore Movies
                </Link>
              </div>
            ) 
          
          : 
          
            (
            <div className="flex flex-col gap-8 w-full mt-4">
              
              {favorites.map((movie) => (
                
                <motion.div 
                  key={movie.id} 
                  className="flex flex-col md:flex-row gap-4 md:gap-6 items-start justify-start 
                             cursor-pointer w-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >

                  <div className="flex flex-row w-full gap-4 md:gap-6">

                    <div className="w-32 sm:w-40 md:w-48 shrink-0 flex flex-col gap-3">
                      <Link to={`/movie-detail-page/${movie.id}` }>

                        <img 
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                          alt={movie.title}
                          className="w-full h-auto block object-cover rounded-2xl cursor-pointer 
                                      hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      
                    </div>

                    <div className="flex flex-col flex-1 gap-4 mt-2 md:mt-6">
                      
                          <div className="flex flex-col gap-4">
                              <h3 className="text-neutral-25 font-semibold text-lg md:text-xl line-clamp-2" 
                                  title={movie.title}>
                                {movie.title}
                              </h3>
                          </div>


                          <div className="flex flex-row gap-4">
                              <img src={Star} className="w-8 h-auto " />
                              <p className="text-neutral-300 font-bold pt-1">{movie.vote_average?.toFixed(1)}/10</p>
                          </div>


                          <p className="text-neutral-400 text-sm line-clamp-3 md:line-clamp-none">                         
                            
                            {movie.overview}

                          </p>


                          <div className="hidden md:flex flex-row gap-4 items-center">
                            <Button className="bg-primary-300 rounded-2xl h-12 w-8/10 md:w-56 cursor-pointer 
                                               hover:scale-105 transition-transform" 
                                    onClick={() => handleWatchTrailer(movie.id)}>
                              
                              <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                        
                              <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                            
                            </Button>

                            <Button className="bg-black rounded-full w-12 h-12 border-1 border-neutral-900 flex 
                                               justify-center items-center cursor-pointer hover:scale-110 transition-transform"
                                    onClick={() => removeFavorite(movie.id)}>
                                <img src={HeartIconFilled} className="w-6 h-6" alt="Remove Favorite" />
                            </Button>
                          </div>

                    </div>

                  </div>

                  <div className="flex md:hidden flex-row gap-4 w-full items-center">
                    <Button className="bg-primary-300 rounded-2xl h-12 flex-1 cursor-pointer hover:scale-105 transition-transform" 
                            onClick={() => handleWatchTrailer(movie.id)}>
                      
                      <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>                        
                      <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                    
                    </Button>

                    <Button className="bg-black rounded-full shrink-0 w-12 h-12 border-1 border-neutral-900 
                                       flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => removeFavorite(movie.id)}>
                        <img src={HeartIconFilled} className="w-6 h-6" alt="Remove Favorite" />
                    </Button>
                  </div>

                </motion.div>    
              
              ))}

            </div>
          )}

      </div>


          {/* ini mau diubah/dipindahkan menjadi component jika masih sempat....*/}
          {showTrailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center 
                                  bg-black/90 px-4  md:px-0"   onClick={() => setShowTrailer(false)}>

                  {trailerKey ? (
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl   overflow-hidden 
                                    shadow-2xl " onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setShowTrailer(false)}
                        className="absolute  flex items-center justify-center top-2 right-2 md:top-4 md:right-4 z-10 w-10 h-10 
                                    bg-black/50 hover:bg-black/80  text-white rounded-full  cursor-pointer 
                                    transition-colors"
                      >
                          <img src={CloseIcon} className="w-6 h-6" alt="Close" />
                      </button>

                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="bg-neutral-800 p-6 rounded-xl 
                         flex flex-col items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
                      
                      <p className="text-white text-lg">Video tidak bisa diputar, pilih video lain.</p>
                      <button className="bg-primary-300 px-6 py-2 rounded-full text-white 
                              font-semibold cursor-pointer" 
                              onClick={() => setShowTrailer(false)}>Tutup</button>
                    
                    </div>
                  )}
                </div>
              )}

        
    </motion.div>
  )
}

export default FavoriteMoviesPage