import { useMemo } from 'react'
import VideoPlayIcon from '../assets/icon-videoPlay.svg';

import { usePopularMovies, useMovieDetails  } from '../hooks/useMovies';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
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

  if (isLoading || !isDataReady)return <div className="w-full aspect-video max-h-[110vh] bg-neutral-900 animate-pulse"></div>;

  const featuredMovie = movieId ? movieDetailsData : popularData.results[randomIndex];
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

                  <div className="absolute bottom-[-25%] w-full left-0 px-25 flex flex-row justify-start items-start gap-8 z-10">
                      
                      <div className="w-60 shrink-0 h-auto">
                          <MovieCard key={featuredMovie.id} movie={featuredMovie} /> 
                      </div>

                      <div className="flex flex-col flex-1 items-start gap-4 mt-4 overflow-hidden">
                          <h1 className="text-display-md text-neutral-25 font-bold">{featuredMovie.title}</h1>

                          <div className="flex flex-row gap-4">
                            <img src={CalendarIcon} className="w-6 h-6" />
                            <p className="text-neutral-200 text-lg">
                                {featuredMovie.release_date ? new Date(featuredMovie.release_date).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }) : '-'}
                            </p>
                          </div>    

                          <div className="flex flex-row gap-4 justify-between items-center">
                            <Button className="bg-primary-300 rounded-2xl h-12 w-48 cursor-pointer">
                                <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>
                                <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                            </Button>
                            <Button className="bg-black rounded-full w-10 h-10 border-1 border-neutral-900 flex justify-center items-center cursor-pointer">
                                <img src={HeartIcon} className="w-6 h-6" />                                
                            </Button>
                          </div>

                          <div className="w-full flex flex-row gap-8 bg-transparent border-0">
                            <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black border-white border-0 py-4">
                                <img src={Star} className="w-8 h-8 pt-2 mt-2" />
                                <h3 className="text-neutral-300 text-sm">Rating</h3>
                                <p className="text-neutral-300 font-bold">{featuredMovie.vote_average.toFixed(1)}/10</p>
                            </Card>
                            <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black border-white border-0 py-4 px-2 text-center">
                              <img src={VideoCamera} className="w-8 h-8 pt-2 mt-2" />
                              <h3 className="text-neutral-300 text-sm">Genre</h3>
                              
                              <p className="text-neutral-300 font-bold">{featuredMovie.genres?.map((genre: { id: number; name: string }) => genre.name).join(', ') || '-'}</p>
                            </Card>
                            <Card className="flex flex-col flex-1 justify-center items-center gap-4 bg-black border-white border-0 py-4">
                              <img src={EmojiHappy} className="w-8 h-8 pt-2 mt-2" />
                              <h3 className="text-neutral-300 text-sm">Age Limit</h3>
                              <p className="text-neutral-300 font-bold"> ??? </p>
                            </Card>
                          </div>
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


                    
                    <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-4 justify-between">
                      <Button className="bg-primary-300 rounded-2xl h-12 w-full md:w-48 cursor-pointer">
                        <p className="text-md text-neutral-25 font-semibold">Watch Trailer</p>
                        <img src={VideoPlayIcon} className="bg-transparent border-white w-6 h-6 ml-2"/>
                      </Button>
                      <div className="w-full md:w-48">
                        <Link to={`/movie-detail-page/${featuredMovie.id}`}>                   
                          <Button className="bg-button-secondary/50 backdrop-blur-sm 
                                            border-neutral-900 border-1 rounded-2xl h-12 w-48 cursor-pointer">
                            <p className="text-md text-neutral-25 font-semibold">See Detail</p>
                          </Button>
                        </Link>
                      </div>
                    </div>
                    

                  </div>                
                }     
          </div>
    </div>
  )
}

export default FeaturedCard