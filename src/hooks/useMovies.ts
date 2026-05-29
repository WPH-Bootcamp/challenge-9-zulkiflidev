import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies

/**
 * Hook to fetch popular movies
 */
export const usePopularMovies = (page = 1) => {
  // TODO: Implement useQuery hook
  // Hint: Use movieService.getPopularMovies as queryFn
  return useQuery({
    
    queryKey: ['movies', 'popular'],

    queryFn: () => movieService.getPopularMovies(page),
    
    
    /* --Jika belum diimplementasikan...
    queryFn: () => {
      // TODO: Call your movie service function
      throw new Error('Not implemented');
    },
    */

  });
};


/**
 * Hook to fetch now playing movies -- fungsi baru
 */

export const useNowPlayingMovies = () => {
  return useInfiniteQuery(
    {
      queryKey: ['movies', 'now_playing'],
      queryFn: ( { pageParam }) => movieService.getNowPlayingMovies(pageParam),
      
      initialPageParam: 1,
      
      getNextPageParam: (lastPage, allPages) =>{
        
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage: undefined;

      },
    
  });
}

/**
 * Hook untuk mendapatkan detail movie
 */
export const useMovieDetails = (id: number) => {
  return useQuery({

    queryKey: ['movies', 'details', id],
    
    queryFn: () => movieService.getMovieDetails(id),

  });
}

/**
 * Hook untuk mendapatkan daftar cast/credit suatu movie
 */

export const useMovieCasts = (id: number) => {
  return useQuery({

    queryKey: ['movies', 'casts', id],
    
    queryFn: () => movieService.getMovieCasts(id),

  });
}



// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
