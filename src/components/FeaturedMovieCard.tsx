import { useMemo, useState } from 'react'
import VideoPlayIcon from '../assets/icon-videoPlay.svg';

import { usePopularMovies, useMovieDetails, useMovieTrailer  } from '../hooks/useMovies';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

import MovieCard from './MovieCard';
import { Card } from './ui/card';
import Star from '../assets/star.svg'
import VideoCamera from '../assets/video-camera-icon.svg';
import EmojiHappy from '../assets/emoji-happy.svg';
import CalendarIcon from '../assets/calendar-icon.svg';
import HeartIcon from '../assets/heart-icon.svg';

//Interface untuk props
interface FeaturedCardProps {
  movieId?: string; // Opsional, karena di Home.tsx tidak dikirimkan
}

//Menangkap props 'movieId' dari parameter
function FeaturedCard({ movieId }: FeaturedCardProps) {

  // State untuk mengontrol kemunculan pop-up modal YouTube Trailer
  const [showTrailer, setShowTrailer] = useState(false);

  const { data:popularData, 
          isLoading:popularIsLoading, 
          //isError:popularIsError, 
          //error:popularError  
          } = usePopularMovies();

  //Cegah NaN dengan memberikan default value 0 jika movieId tidak ada
  const numericMovieId = movieId ? Number(movieId) : 0;
  const { data:movieDetailsData, 
        isLoading:movieDetailsIsLoading, 
        //isError:movieDetailsIsError, 
        //error:movieDetailsError  
        } = useMovieDetails(numericMovieId);          

  //Tentukan status loading & ketersediaan data sesuai halaman (Home vs Detail)
  const isLoading = movieId ? movieDetailsIsLoading : popularIsLoading;
  const isDataReady = movieId ? !!movieDetailsData : (!!popularData && popularData.results?.length > 0);

  //Tentukan data film yang ingin ditampilkan: Detail film ATAU Popular film acak
  const randomIndex = useMemo(() => Math.floor(Math.random() * 19), []);
  const featuredMovie = movieId ? movieDetailsData : popularData?.results?.[randomIndex];

  //==Movie Trailer, pakai "useMovieTrailer"      
  const { data:movieTrailerData } = useMovieTrailer(featuredMovie?.id || 0);       
  
  // Cari video trailer dari YouTube
  const trailerVideo = movieTrailerData?.results?.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube') || movieTrailerData?.results?.[0];
  const trailerKey = trailerVideo?.key;

  if (isLoading || !isDataReady)return <div className="w-full aspect-video max-h-[110vh] bg-neutral-900 animate-pulse"></div>;

  const backdropUrl = `https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path}`;

  return (
    <div>
        <div className="relative">
              <div className="">
                  <div className = "w-full relative border-0">
                    <img src = {backdropUrl}
                        alt = {featuredMovie.title}
                        className = "w-full aspect-[3/4] object-cover object-[center_5%] md:aspect-video md:max-h-[110vh] md:object-top "/>
              
                    {/* Buat tepian bawah featured, biar bisa efek gelap */}
                    <div className="absolute border-0 bottom-0 left-0 w-full h-1/2 z-1 bg-linear-to-t from-black to-transparent"></div>
                
                  </div> 
              </div>

              <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

              {/* Gini, jadi ada 2 opsi tampilan, yaitu Halaman Depan pakai data popular Movie atau Movie Detail, ini opsinya: */}
              {/* (1) Jika id movie aja, maka untuk Detail Movie, jadi bentukan desainnya memang beda */} 
              {/* (2) Jika id nya ga ada, maka  ini buat halaman depan pakai data populer dirandom, 
              {/* ....gitulah... saya sih berdasarkan desain figma saja... */}  
              {movieId ? 
              
                <div>
                  <div className="absolute left-0 bottom-[5%] md:bottom-[-25%] w-full px-2 md:px-25 flex flex-row 
                                  justify-start items-start md:gap-8 z-10">
                      
                      <div className="px-4 md:px-0 w-4/10 md:w-60 md:shrink-0 md:h-auto">
                          <MovieCard key={featuredMovie.id} movie={featuredMovie} /> 
                      </div>
                      
                      <div className="flex flex-col flex-1 items-start gap-2 md:gap-4 mt-4 overflow-hidden">
                          <h1 className="text-display-sm md:text-display-md text-neutral-25 font-bold">{featuredMovie.title}</h1>

                          <div className="flex flex-row gap-4">
                            <img src={CalendarIcon} className="w-6 h-6" />
                            <p className="text-neutral-200 text-lg">

                                {/* format tanggal disesuakn dengan format Indonesia */}
                                {  featuredMovie.release_date ? 
                                      new Date(featuredMovie.release_date).toLocaleDateString('id-ID', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric'
                                      }) : '-'}
                            </p>
                          </div>    

                          <div className="hidden md:flex md:flex-row md:gap-4 md:justify-between md:items-center">
                            <Button className="bg-primary-300 rounded-2xl h-12 w-56 cursor-pointer" 
                                    onClick={ 
                                      
                                      () => trailerKey && setShowTrailer(true)

                                    }>
                                
                                <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>
                                <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                            
                            </Button>
                            <Button className="bg-black rounded-full w-10 h-10 border-1 border-neutral-900 flex justify-center 
                                                items-center cursor-pointer">
                            
                                <img src={HeartIcon} className="w-6 h-6" />                                
                            </Button>
                          </div>

                          <div className="hidden w-full md:flex md:flex-row gap-8 bg-transparent border-0">
                            <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black border-white border-0 py-4">
                                
                                <img src={Star} className="w-8 h-8 pt-2 mt-2" />
                                <h3 className="text-neutral-300 text-sm">Rating</h3>
                                <p className="text-neutral-300 font-bold">{featuredMovie.vote_average.toFixed(1)}/10</p>
                            </Card>
                            
                            <Card className="flex flex-col flex-1   justify-center items-center gap-4 bg-black
                                              border-white  border-0 py-4 px-2 text-center">
                              
                              <img src={VideoCamera} className="w-8 h-8 pt-2 mt-2" />
                              <h3 className="text-neutral-300 text-sm">Genre</h3>
                              
                              <p className="text-neutral-300 font-bold">

                                {/* --tampilkan beberapa genre  */}
                                  {featuredMovie.genres?.map((genre: { 
                                    id: number; name: string }) => genre.name).join(', ') || '-'}
                              </p>
                              
                            </Card>
                            <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black border-white border-0 py-4">

                              {/* buat batasan umur, tapi belum ketemu di mana API nya bagian mananya...*/}
                              <img src={EmojiHappy} className="w-8 h-8 pt-2 mt-2" />
                              <h3 className="text-neutral-300 text-sm">Age Limit</h3>
                              <p className="text-neutral-300 font-bold"> ??? </p>

                            </Card>
                          </div>
                      </div>                         
                  </div> 

                  <div className="absolute left-0 bottom-[-5%] w-full px-8  flex flex-row 
                                  justify-start items-start z-10 md:hidden">

                    <div className="flex flex-row w-full gap-8 md:hidden">
                      
                      {/* Video Trailer, KEY nya tinggal dibuka di youtube */}
                      <Button className="bg-primary-300 rounded-2xl 
                                         h-12  w-8/10 cursor-pointer" 
                                         onClick={  
                                            () => trailerKey && setShowTrailer(true)
                                         }>

                          <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>
                          <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                      
                      </Button>

                      {/* Button buat simpan favorite Movie */}
                      <Button className="bg-black rounded-full w-10 h-10 border-1 border-neutral-900 flex justify-center items-center cursor-pointer">
                          
                          <img src={HeartIcon} className="w-6 h-6" />                                
                      
                      </Button>
                    </div>
                  </div>
                  
                  <div className="absolute flex flex-row gap-4 left-0 bottom-[-35%] w-full px-8   
                                  justify-start items-start z-10 md:hidden">

                    {/* Buat tampilkan rating */} 
                    <Card className="flex flex-col flex-1 justify-center 
                                      items-center gap-4 bg-black   border-neutral-800 border-1 py-4">
                        <img src={Star} className="w-8 h-8 pt-2 mt-2" />
                        <h3 className="text-neutral-300 text-sm">Rating</h3>
                        <p className="text-neutral-300 font-bold">{featuredMovie.vote_average.toFixed(1)}/10</p>
                    </Card>

                    <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black border-neutral-800 border-1 py-4 px-2 text-center">
                      <img src={VideoCamera} className="w-8 h-8 pt-2 mt-2" />
                      <h3 className="text-neutral-300 text-sm">Genre</h3>
                      
                      {/* --tampilkan beberapa genre 
                          <p className="text-neutral-300 font-bold">{featuredMovie.genres?.map((genre: { id: number; name: string }) => genre.name).join(', ') || '-'}</p>
                      */}
                      <p className="text-neutral-300 font-bold">{featuredMovie.genres?.[0]?.name || '-'}</p>
                    </Card>
                    
                    <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black 
                                      border-neutral-800 border-1 py-4">
                      
                      <img src={EmojiHappy} className="w-8 h-8 pt-2 mt-2" />
                      <h3 className="text-neutral-300 text-sm">Age Limit</h3>
                      <p className="text-neutral-300 font-bold"> ??? </p>

                    </Card>
                  </div>
                </div>
                                 
              :
                                                 
                  <div className="absolute top-2/3 md:bottom-1/10 px-4 md:px-25 flex flex-col gap-4 z-10">
                    <div>
                        <h1 className="text-display-md text-neutral-25 font-bold">
                          {featuredMovie.title}
                        </h1>
                    </div> 
                    <div className="w-full  md:w-1/2  text-neutral-400">

                        <h3 className="text-sm">
                          {featuredMovie.overview}
                        </h3>
                    </div>
                    
                    <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">

                      <Button className="bg-primary-300 rounded-2xl h-12 w-full md:w-56 cursor-pointer" 
                              onClick={() => trailerKey && setShowTrailer(true)}>
                        
                        <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>
                        
                        <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                      
                      </Button>
                      
                      <div className="w-full md:w-56">

                        {/* Link dari tiap poster movie diarahkan ke detail tiap movie jika diklik/ditap */}
                        <Link to={`/movie-detail-page/${featuredMovie.id}`}>       

                          <Button className="bg-button-secondary/50 backdrop-blur-sm 
                                            border-neutral-900 border-1 rounded-2xl h-12 w-full cursor-pointer">
                            <p className="text-md text-neutral-25 font-semibold">See Detail</p>
                          </Button>
                      
                        </Link>
                      
                      </div>
                    </div>
                    

                  </div>                
                }     
          </div>

          {/* Modal untuk YouTube Trailer */}
          {/* jadi begini, dari API TMDB memang menyediakan trailer berupa key,
              yang mana key itu merupakan ID Video yang bisa disambungkan ke Youtube....
              
              yaitu:
              https://youtube.com/watch?v=
          */}    

          
          {showTrailer && trailerKey && (
            <div className="fixed inset-0 z-50 flex items-center justify-center 
                             bg-black/90 px-4  md:px-0"   onClick={() => setShowTrailer(false)}>

              <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl   overflow-hidden 
                              shadow-2xl " onClick={(e) => e.stopPropagation()}>

                <button
                  onClick={() => setShowTrailer(false)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-10 h-10 flex items-center justify-center 
                             bg-black/50 hover:bg-black/80  text-white rounded-full  cursor-pointer 
                             transition-colors"
                >

                  <svg xmlns="http://www.w3.org/2000/svg" 
                       fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
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
            </div>
          )}
    </div>
  )
}

export default FeaturedCard