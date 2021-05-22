import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Filters.css"

function Filters() {

    let queryfiltroGenero = new URLSearchParams(useLocation().search).get("filtroGenero")
    let queryfiltroAdd = new URLSearchParams(useLocation().search).get("filtroAdd")
    let queryOrder = new URLSearchParams(useLocation().search).get("order")
    let queryName = new URLSearchParams(useLocation().search).get("name")

    const { genresList } = useSelector(store => store)

    const [genreFilter, setGenreFilter] = useState("action")
    const [orderFilter, setOrderFilter] = useState("name")

    //filtro por genero
    function getFilterGenre(e) {
        e.preventDefault()
        setGenreFilter(e.target.value)
    }

    //filtro por orden
    function getFilterOrder(e) {
        e.preventDefault()
        setOrderFilter(e.target.value)
    }

    var key = 1;

    return (
        <div className="filterdivM">

            <span>Genre filter</span>
            <select name="filtroGenero" onChange={getFilterGenre} id="selectFGM">
                {genresList?.map(g => <option key={`M${key++}`} value={g.slug}>{g.name}</option>)}
            </select>
            <Link to={queryName ?
                `/search?name=${queryName}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}&filtroGenero=${genreFilter}${queryOrder ? "&order=" + queryOrder : ""}`
                :
                `/videogames?${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}&filtroGenero=${genreFilter}${queryOrder ? "&order=" + queryOrder : ""}`
            }>
                <button className="buttonFilter">Filter</button>
            </Link>
            <Link to={queryName ?
                `/search?name=${queryName}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryOrder ? "&order=" + queryOrder : ""}`
                :
                `/videogames?${queryfiltroAdd ? "filtroAdd=" + queryfiltroAdd : ""}${queryOrder ? "&order=" + queryOrder : ""}`
            }>
                <button className="buttonFilter">Reset</button>
            </Link>
            <br />
            <br />

            <span>Added games filter</span>
            <div>
                <Link to={queryName ?
                    `/search?name=${queryName}&filtroAdd=si${queryfiltroGenero ? "filtroGenero=" + queryfiltroGenero : ""}${queryOrder ? "&order=" + queryOrder : ""}`
                    :
                    `/videogames?filtroAdd=si${queryfiltroGenero ? "filtroGenero=" + queryfiltroGenero : ""}${queryOrder ? "&order=" + queryOrder : ""}`
                }>
                    <button className="buttonFilter"> Yes </button>
                </Link>
                <Link to={
                    `/videogames?${queryfiltroGenero ? "filtroGenero=" + queryfiltroGenero : ""}${queryOrder ? "&order=" + queryOrder : ""}`
                }>
                    <button className="buttonFilter">No</button>
                </Link>
            </div>
            <br />

            <span>Order by </span>
            <select name="orden" onChange={getFilterOrder} id="selectFOM">
                <option key={`M${key++}`} value="name">Name</option>
                <option key={`M${key++}`} value="-rating">Rating</option>
            </select>
            <Link to={queryName ?
                `/search?name=${queryName}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}${orderFilter ? "&order=" + orderFilter : ""}`
                :
                `/videogames?${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}${orderFilter ? "&order=" + orderFilter : ""}`
            }>
                <button className="buttonFilter">Order</button>
            </Link>
            <Link to={queryName ?
                `/search?name=${queryName}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}`
                :
                `/videogames?${queryfiltroAdd ? "filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}`
            }>
                <button className="buttonFilter">Reset</button>
            </Link>
        </div>
    )
}

export default Filters;
