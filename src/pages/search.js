import React from "react";
import "../assets/search.css";

const Search = ({ type }) => {
    return (
        <div className="search">
            <input 
                type="text"
                placeholder="Search"
                className="search-input"
            />

            <i className="fa-solid fa-magnifying-glass searchPgBtn"></i>

        </div>
    )
}

export default Search;

