//import { useRef } from 'react';
import type { Movie} from '../types/movie';
import MovieCard from '../components/MovieCard';

import { usePopularMovies, useNowPlayingMovies  } from '../hooks/useMovies';

import { Carousel, CarouselContent, 
         CarouselItem, CarouselNext,
         CarouselPrevious
        } from "../components/ui/carousel"


import { Button } from '../components/ui/button';

import FeaturedMovieSection from '../components/section/FeaturedMovieSection'
import { motion } from 'framer-motion';

function Home() {

  const { data:popularData, 
          isLoading:popularIsLoading, 
          isError:popularIsError, 
          error:popularError  } = usePopularMovies();


  const { 
    data:nowPlayingData, 
//    isLoading:nowPlayingIsLoading, 
//    isError:nowPlayingIsError, 
//    error:nowPlayingError,  
    fetchNextPage:nowPlayingFetchNextPage, 
    hasNextPage:nowPlayingHasNextPage, 
    isFetchingNextPage:nowPlayingIsFetchingNextPage 
 } = useNowPlayingMovies();


  //Test 1 ---> apa loading statenya jalan?
  if (popularIsLoading) return (

    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent 
                      rounded-full animate-spin"></div>
    </div>
  
  );

  //Test 2 --> Aapa error statenya jalan?
  if (popularIsError) return (
    <div className="min-h-screen flex items-center justify-center w-full">

      <p className="text-neutral-400 text-display-xl">Error!</p>
      <p className="text-neutral-400 text-display-lg">{popularError?.message}</p>      
    
    </div>
  
  );
  

  console.log("nowPlayingHasNextPage=", nowPlayingHasNextPage);
  
  return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        {/* ini untuk hero section nya - featured image*/}
        <div className="relative -mt-24">
          
          {/* Featured Image */}
          <FeaturedMovieSection />

        </div>

        {/* ini popular movies - horizontal view */}
        <div className="relative mt-45 md:mt-0">
          
          <div className="text-display-md font-bold text-neutral-25 px-4
                          md:px-25 pb-4 md:pt-16">
           
              <h2>Trending Now</h2>
          </div>

          <div className="relative overflow-hidden">
              <Carousel className="w-full" opts={{ align: "center" }}>                  
                  <CarouselContent className="px-4 md:px-25">
                    {
                        popularData?.results?.map((movieItem: Movie) => (                          
                          <CarouselItem key={movieItem.id} 
                                       className="basis-1/2 sm:basis-1/3  md:basis-1/4 lg:basis-[18%]">
                           
                            <MovieCard key={movieItem.id} movie={movieItem} />                          
                          </CarouselItem>
                        )
                    )}
                  </CarouselContent>                  
                  <CarouselPrevious className="left-10 peer/prev disabled:hidden z-10"/>
                  <CarouselNext className="right-10 peer/next disabled:hidden z-10"/>
              </Carousel>

            <div className="absolute left-0 top-0 h-full w-12  md:w-56 bg-gradient-to-r from-black 
                            via-black/70 to-transparent  pointer-events-none  
                            peer-disabled/prev:opacity-0"></div>

            <div className="absolute right-0 top-0 h-full w-12 md:w-56 
                            bg-gradient-to-l from-black via-black/70 to-transparent 
                            pointer-events-none  peer-disabled/prev:opacity-0">
            </div>

          </div>
        </div>

        {/* ini now playing movies - 3 baris grid view */}
        <div className="relative px-4">
          
          
          <div className="text-display-md font-bold text-neutral-25 md:px-25 pb-4 pt-16">
              <h2>New Release</h2>
          </div>
          
          
          <div className="grid grid-cols-2 md:px-25 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-24">
              
              {nowPlayingData?.pages?.
                flatMap(p => p.results.slice(5))?.map((movieItem) => 
                    (
                        <motion.div 
                          key={movieItem.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <MovieCard movie={movieItem} />
                        </motion.div>
                    )
              )}


          </div>


          <div className="absolute flex flex-row  bottom-8 left-0 w-full justify-center 
                         justify-center items-center py-8 -mt-8 pb-12">
              {nowPlayingHasNextPage && (
                
                <Button className="text-md z-20 hover:scale-105 transition-transform"
                        onClick={()=> nowPlayingFetchNextPage()}
                        disabled={nowPlayingIsFetchingNextPage}>

                     {nowPlayingIsFetchingNextPage ? (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent 
                                        rounded-full animate-spin"></div>
                     ) : "Load More"}

                </Button>

              )}
          </div>


          {/* Buat tepian bawah featured, biar bisa efek gelap */}
          <div className="absolute border-0 bottom-0 left-0 w-full h-150 z-10       
                          bg-gradient-to-t from-[30%] from-black via-black/80 to-transparent 
                          pointer-events-none">
          </div>          
        
        </div>

        
    </motion.div>
  )
}

export default Home