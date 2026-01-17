import SearchStyle from "../Search/search.module.css";
import { Search } from "iconoir-react";
import { useEffect, useState } from "react";


export default function SearchBar({ handleResult , handleQuery , handleLoading , handleItems}) {
    const [ searchTerm, setSearchTerm ] = useState("");
    
    useEffect(() => {
        handleQuery(searchTerm);
    },[searchTerm]);
    const handleSearch = (e) => {
        if(e.target.value.trim() === ""){
            handleLoading(false);
            handleItems([]);
            return;
        }
        handleLoading(true);
        setTimeout(() => {
            setSearchTerm(e.target.value);
        }, 3000);
    }
    return (
        <div className={SearchStyle["search-bar"]}>
            <input type="text" placeholder="Insert a keyword..." onChange={handleSearch} />
            <button>
                <Search width="20" height="20" />
            </button>
        </div>
    );
}