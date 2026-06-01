import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  vote_average?: number;
}

// TODO: Define your store state interface
interface MovieStore {
  // TODO: Add state properties
  // Examples: favorites, watchlist, selectedMovie, etc.
  favorites: FavoriteMovie[];

  // TODO: Add action methods
  // Examples: addToFavorites, removeFromFavorites, etc.
  addFavorite: (movie: FavoriteMovie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction
export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
        // TODO: Initialize state and implement actions
        
        favorites: [],

        addFavorite: (movie) =>
          set((state) => {
       
            const isExist = state.favorites.some((fav) => fav.id === movie.id);
            if (!isExist) {
              return { favorites: [...state.favorites, movie] };
            }
       
            return state;
        }),
        
        removeFavorite: (id) =>
        
          set((state) => ({
            favorites: state.favorites.filter((fav) => fav.id !== id),
          })),
        
          isFavorite: (id) => {
          const favs = get().favorites;
          return favs.some((movie) => movie.id === id);
        
        },

    }),
    {
      name: 'movie-favorites-storage',
    }
  )
);
