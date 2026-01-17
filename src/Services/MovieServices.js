import axios from "axios";
import generateRequest from "../config/request.config.js";
export default function MovieServices() {
    const { 
        getRequest
     } = generateRequest();
    async function searchMovies(searchTerm) {
        if(searchTerm.trim() === "") return;
        try {
            const API_URL = import.meta.env.VITE_SEARCH_MOVIE_URL;
            const response = await getRequest({ path: API_URL , params: { query: searchTerm } });
            return  response.data.results;
        } catch (error) {
            console.warn(`Error found in: ${error}`);
        }
    }
    async function getMovieDetails(movieId){
        if(isNaN(movieId)) return;
        try {
            const API_URL = import.meta.env.VITE_MOVIE_DETAILS_URL;
            const response = await getRequest({ path: API_URL + `/${movieId}` });
            return response.data;
        }catch(error){
            console.warn(`Error found in: ${error}`);
        }
    }
    return {
        searchMovies,
        getMovieDetails
    }
}