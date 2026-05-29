import { create } from 'zustand';
// import { Movie } from '@/types/movie';

// TODO: Define your store state interface
interface MovieStore {
  // TODO: Add state properties
  // Examples: favorites, watchlist, selectedMovie, etc.

  //dummy:supaya npm run build --> jalan
  dummy: string;
  setDummy: (val: string) => void; //dummy


  // TODO: Add action methods
  // Examples: addToFavorites, removeFromFavorites, etc.
}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction




//sementara ditutup, sypaya npm run build ---> jalan

export const useMovieStore = create<MovieStore>()((set) => ({
  // TODO: Initialize state and implement actions

  // Inisialisasi properti dummy supaya project bisa di-build
  dummy: "nilai dummy",
  setDummy: (val) => set({ dummy: val }), //dummy
}));
