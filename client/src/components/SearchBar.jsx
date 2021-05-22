import { useState } from 'react';
import { Link } from "react-router-dom"
import "./SearchBar.css";

function SearchBar() {

    const [search, setSearch] = useState("")

    function handleChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div className="searchDiv">
            <div className="mainmenu">
                <Link to="/">
                    <button className="buttonHome">Home</button>
                </Link>
                <Link to="/videogames">
                    <button className="buttonMain">Main</button>
                </Link>
            </div>
            <div className="search">
                <form action="" >
                    <input className="inputtextSB" type="text" onChange={handleChange} />
                    <Link to={`/search?name=${search}`}>
                        <input className="buttonSearchSB" type="submit" value="Search" />
                    </Link>
                </form>
            </div>
            <div className="addgame">
                <Link to="/addgame">
                    <button className="botonAddSB">Add Game</button>
                </Link>
            </div>
        </div>
    )
};

export default SearchBar;
