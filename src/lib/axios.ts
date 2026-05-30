import axios from 'axios';

// TODO: Create axios instance with base configuration
// Hint: Use environment variables for API URL and API key
// Reference: https://axios-http.com/docs/instance

const api = axios.create({
  // TODO: Configure baseURL from environment variable
  // TODO: Add default headers (API key, content-type)
  baseURL: "https://api.themoviedb.org/3",   // semua request otomatis pakai base URL ini
  timeout: 10000,                        // batalkan request setelah 10 detik
  headers: {   
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
  },


});

// TODO: Add request interceptor if needed
// Hint: You can add API key to every request here

//ini baru request interceptor nya ajah.....
api.interceptors.request.use(

  //ambil token dari file .env
  (config) => {

    // kalau token ketemu, selipkan ke ke header auth nya ya......
    const token = import.meta.env.VITE_TMDB_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// TODO: Add response interceptor for error handling

//nah disini kita bikin response interceptor, buat menangani segala macam error
api.interceptors.response.use(

  (response) => { 
    return response;
  },
  (error) => { 

    //baru handle 2 error, 401 & 404
    if (error.response){
      if (error.response.status === 401) {
        console.log("Error 401 - Token tidak valid!");      
      }
      else if (error.response.status === 404){
        console.log("Error 404 - Tidak ditemukan!");
      }
      else{
        console.log("Error lainnya - tidak diketahui error apa yang terjadi")
      }
    }
    else if (error.request){

      console.error("Network Error: Tidak ada response dari API Server!")
    }

    //lempat error supaya bisa ditangkep sama React Query
    return Promise.reject(error);
  }

);

export default api;
