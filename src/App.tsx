import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';



function App() {
  // TODO: Setup routing dengan React Router
  // TODO: Implement layout structure
  // TODO: Add navigation between pages

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-gray-400">
        <header className="sticky top-0 z-50">
          <Navbar />

        </header>

        <main className="w-full">
          {/* TODO: Replace this with your actual application routes and components */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-detail-page/:id" element={<MovieDetailPage />} />

            <Route path="/search" element={<SearchPage />} />


            <Route path="*" element={<div>404 - Halaman tidak ditemukan</div>} />

          </Routes>          
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
