import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipe data buat nyimpen film favorit... 
// minimal butuh id, title, poster, overview, dan rating-nya...
export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  vote_average?: number;
}

interface FavoriteStore {
  
    favorites: FavoriteMovie[];
    addFavorite: (movie: FavoriteMovie) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;

}

export const useFavoriteStore = create<FavoriteStore>()(

  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) =>
        set((state) => {


            // cek dulu filmnya udah ada apa belum...
            const isExist = state.favorites.some((fav) => fav.id === movie.id);

            if (!isExist) {
              
              // console.log("nambah favorite: ", movie.title); // buat debug...
              return { favorites: [...state.favorites, movie] };
            }

            // kalau udah ada ya balikin state semula aja...
            return state; 

        }),

      removeFavorite: (id) =>

          set((state) => ({
            favorites: state.favorites.filter((fav) => fav.id !== id),
          })),

      // buat ngecek aja ini film udah masuk favorite belum...
      isFavorite: (id) => {

          const favs = get().favorites;
          return favs.some((movie) => movie.id === id);
      },
    }),
    {
      name: 'movie-favorites-storage' // key buat localStorage-nya...
    }
  )
);
