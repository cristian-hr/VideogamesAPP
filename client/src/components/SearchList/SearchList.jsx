import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import GameCard from "../GameCard/GameCard";
import SearchBar from "../SearchBar/SearchBar";
import { search, filterGenSea, filterAdd, order } from "../../redux/actions";
import Filters from "../Filters/Filters"
import "./SearchList.css";

function SearchList(props) {

    const dispatch = useDispatch()

    let queryName = new URLSearchParams(useLocation().search).get("name")
    let queryfiltroGenero = new URLSearchParams(useLocation().search).get("filtroGenero")
    let queryfiltroAdd = new URLSearchParams(useLocation().search).get("filtroAdd")
    let queryOrder = new URLSearchParams(useLocation().search).get("order")

    const {
        searchList,
        filtradoGenSea,
        filtradoAdd,
        ordered,
        loading,} = useSelector(store => store)

    var games;

    useEffect(() => {
        if (!queryName) {
            window.location.assign(`http://localhost:3000/videogames`)
        }
        if (queryOrder) {
            if ((ordered.find(game => game.page === "1")?.order !== queryOrder ||
                (queryfiltroGenero ?
                    (ordered.find(game => game.page === "1")?.genre === undefined ? true :
                        ordered.find(game => game.page === "1")?.genre !== queryfiltroGenero)
                    : ordered.find(game => game.page === "1")?.genre) ||
                (queryfiltroAdd ?
                    (ordered.find(game => game.page === "1")?.filterAdd === undefined ? true :
                        ordered.find(game => game.page === "1")?.filterAdd !== queryfiltroAdd)
                    : ordered.find(game => game.page === "1")?.filterAdd))
            ) {
                dispatch(order(queryOrder, queryName, queryfiltroGenero, queryfiltroAdd, false))
            }
        }
        else if (queryfiltroAdd) {
            dispatch(filterAdd(queryName, queryfiltroGenero, queryfiltroAdd, false))
        }
        else if (queryfiltroGenero) {
            if (!(filtradoGenSea?.find(game => game.page === "1")?.search === queryName)) {
                dispatch(filterGenSea(queryName, queryfiltroGenero))
            }
        }
        else {
            if (!(searchList?.find(game => game.page === "1")?.search === queryName)) {
                dispatch(search(queryName))
            }
        }
    }
    // eslint-disable-next-line
        , [queryName, queryfiltroGenero, queryOrder, queryfiltroAdd])

    if (queryOrder) games = ordered.find(game => game.page === "1")?.games;
    else if (queryfiltroAdd) games = filtradoAdd.find(game => game.page === "1")?.games;
    else if (queryfiltroGenero) games = filtradoGenSea?.find(game => game.page === "1")?.games;
    else games = searchList?.find(game => game.page === "1")?.games;

    var next =
        `/videogames/page/2${queryName || queryfiltroAdd || queryOrder || queryfiltroGenero ? "?" : ""}${queryName ? "name=" + queryName : ""}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryOrder ? "&order=" + queryOrder : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}`

    if (loading) {
        return (
            <div><img className="loadingReact" src="https://media3.giphy.com/media/RJzm826vu7WbJvBtxX/giphy.gif" alt="" /></div>
        )
    }

    var key = 1;

    return (
        <div className="bigmaindivSL">
            <SearchBar location={props.location} />
            <div className="big2maindivSL">
                <Filters /> 
                <div className={games?.length === 0 ? "notFound" : "notFoundH" }>No games found :(</div>               
                <div className="maindivSL">
                    <div className={games ? "cont1SL" : "cont1SLHide"}>
                        {games?.map(g => <GameCard key={key++}
                            game={g}
                        />)}
                    </div>
                </div>                
            </div>
            <Link to={next}>
                <button className={games?.length < 15 ? "nextbuttonMH" : "nextbuttonM"}
                onClick={()=>window.scrollTo({top: "300px", behavior: "smooth"})}
                >Next Page</button>
            </Link>
        </div>
    )
}

export default SearchList;
