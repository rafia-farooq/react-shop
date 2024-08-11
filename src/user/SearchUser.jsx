import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';


const SearchUser = ({searchQuery, setSearchQuery}) => (
    <form action="/user" method="get">
        <div className="input-group w-50 my-3">
            <input
                type="text"
                id="search-bar"
                placeholder="Search products"
                name="search-bar" 
                className="form-control form-group"
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
            />

            <div className="input-group-append">
                <div className="input-group-text">
                    <SearchIcon/>
                </div>
            </div>
        </div>
    </form>
);



export default SearchUser;