import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchBar = () => (
    <form action="/" method="get">
        <div className="input-group w-25 my-3">
            <input
                type="text"
                id="search-bar"
                placeholder="Search products"
                name="search-bar" 
                className="form-control form-group"
            />

            <div className="input-group-append">
                <button type="submit" className="btn btn-outline-success">Search</button>
            </div>
        </div>
    </form>
);



export default SearchBar;