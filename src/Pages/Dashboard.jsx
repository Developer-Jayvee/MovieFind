import SearchBar from "../Components/Search/Search";
import { useEffect, useState } from "react";
import DashboardStyles from "../css/dashboard.module.css";
import MovieServices from "../Services/MovieServices";
import Card from "../Components/Card/Card";
import Loading from "../Components/Loading/Loading";
export default function Dashboard() {
    const { searchMovies } = MovieServices();
    const [ searchTerm , setSearchTerm ] = useState("");
    const [ movieList , setMovieList ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);
    useEffect(() => {
        const fetchMovies = async () => {
            if(searchTerm.trim() === "") {
                setIsLoading(false);
                setMovieList([]);
                return;
            }
            try {
                const results = await searchMovies(searchTerm);
                if(results){
                    setIsLoading(false);
                    setMovieList(results);
                }
            } catch (error) {
                console.warn(`Error found in: ${error}`);
                setIsLoading(false);
                setMovieList([]);
            }
            
        }
        fetchMovies();
    }, [searchTerm]);

   
    return (
        
        <div className={DashboardStyles.dashboard}>
            <h3>MOVIE</h3>
            <h1>FIND</h1>
            <div className="buttons">
                <SearchBar handleItems={setMovieList} handleResult={searchTerm} handleQuery={setSearchTerm} handleLoading={setIsLoading}/>
            </div>
            <Loading isLoading={isLoading} />
            <div className="card-container" >
                {
                    movieList.length > 0 ? movieList.map((movie , index) => 
                        movie.poster_path ? ( <Card key={index}id= {movie.id} /> ): "") : ""
                }
               
            </div>
        </div>
    );
}
