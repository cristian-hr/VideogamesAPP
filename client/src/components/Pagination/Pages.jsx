/*eslint-disable-next-line*/
import React, { useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux"
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router";
import { pages, pagesSearch, filterGen, filterGenSea, filterAdd, order } from "../../redux/actions/index.js"
import GameCard from "../GameCard/GameCard"
import Filters from "../Filters/Filters"
import "./Pages.css"

function Pages() {

    const dispatch = useDispatch()

    let { page } = useParams();

    let queryName = new URLSearchParams(useLocation().search).get("name")
    let queryfiltroGenero = new URLSearchParams(useLocation().search).get("filtroGenero")
    let queryfiltroAdd = new URLSearchParams(useLocation().search).get("filtroAdd")
    let queryOrder = new URLSearchParams(useLocation().search).get("order")

    const { gamesList,
        searchList,
        filtradoGen,
        filtradoGenSea,
        filtradoAdd,
        ordered,
        loading } = useSelector(store => store);    

    useEffect(() => {
        if (queryOrder) {
            if (!(ordered.find(game => game.page === page)?.order === queryOrder)) {
                dispatch(order(queryOrder, queryName, queryfiltroGenero, queryfiltroAdd, page))
            }
        }
        else if (queryfiltroAdd) {
            if (!(filtradoAdd.find(game => game.page === page)?.filterAdd === queryfiltroAdd)) {
            dispatch(filterAdd(queryName, queryfiltroGenero, queryfiltroAdd, page))
            }
        }
        else if (queryName && queryfiltroGenero) {        
            if (!filtradoGenSea.find(game => game.page === page)) {
                dispatch(filterGenSea(queryName, queryfiltroGenero, page))
            }
        }
        else if (queryfiltroGenero) {
            if (!filtradoGen.find(game => game.page === page)) { 
                dispatch(filterGen(queryfiltroGenero, page))
            }
        }
        else if (queryName) {
            if (!searchList.find(game => game.page === page)) {
                dispatch(pagesSearch(page, queryName))
            }
        }
        else {            
        if (!gamesList.find(game => game.page === page)) dispatch(pages(page))
        }
    }
    // eslint-disable-next-line
        , [page]) 
        
    var games;
    if (queryOrder) games = ordered.find(game => game.page === page)?.games;
    else if (queryfiltroAdd) games = filtradoAdd.find(game => game.page === page)?.games;
    else if (queryName && queryfiltroGenero) games = filtradoGenSea.find(game => game.page === page)?.games;
    else if (queryfiltroGenero) games = filtradoGen.find(game => game.page === page)?.games; 
    else if (queryName) games = searchList.find(game => game.page === page)?.games; 
    else games = gamesList.find(game => game.page === page)?.games;    

    //botones first, prev y next
    var next, prev, first;

    if (queryName) first = 
    `/search?name=${queryName}${queryfiltroAdd ? 
        "&filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? 
            "&filtroGenero=" + queryfiltroGenero : ""}${queryOrder ? 
                "&order=" + queryOrder : ""}`
    
    else first = 
    `/videogames${queryfiltroAdd || queryOrder || queryfiltroGenero ? 
        "?" : ""}${queryfiltroAdd ? 
            "filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? 
                "&filtroGenero=" + queryfiltroGenero : ""}${queryOrder ? 
                    "&order=" + queryOrder : ""}`

    if (page === "2") prev = first
    else prev = 
    `/videogames/page/${Number(page) - 1}${queryName || queryfiltroAdd || queryOrder || queryfiltroGenero ? 
        "?" : ""}${queryName ? 
            "name=" + queryName : ""}${queryfiltroAdd ? 
                "&filtroAdd=" + queryfiltroAdd : ""}${queryOrder ? 
                    "&order=" + queryOrder : ""}${queryfiltroGenero ? 
                        "&filtroGenero=" + queryfiltroGenero : ""}`
    
    next = 
    `/videogames/page/${Number(page) + 1}${queryName || queryfiltroAdd || queryOrder || queryfiltroGenero ? 
        "?" : ""}${queryName ? 
            "name=" + queryName : ""}${queryfiltroAdd ? 
                "&filtroAdd=" + queryfiltroAdd : ""}${queryOrder ? 
                    "&order=" + queryOrder : ""}${queryfiltroGenero ? 
                        "&filtroGenero=" + queryfiltroGenero : ""}`

    if (loading) {
        return (
            <div><img className="loadingReact" src="https://media3.giphy.com/media/RJzm826vu7WbJvBtxX/giphy.gif" alt="" /></div>
        )
    }

    return (
        <div className="bigcontdivP">
            <div className="contdivP">
                <div className="maindivP">
                    <div className="filterdivP">
                        <Filters />
                    </div>
                    <div className="cont1P">
                        {games?.map(g => <GameCard
                            game={g}
                        />)}
                    </div>
                </div>
                <div>
                    <Link to={first}>
                        <button className={page === "1" ? "firstbuttonPH" : "firstbuttonP"}
                        onClick={()=>window.scrollTo({top: "300px", behavior: "smooth"})}
                        >First</button>
                    </Link>
                    <Link to={prev}>
                        <button className={page === "1" ? "prevbuttonPH" : "prevbuttonP"}
                        onClick={()=>window.scrollTo({top: "300px", behavior: "smooth"})}
                        >Previus Page</button>
                    </Link>
                    <Link to={next}>
                        <button className={games?.length < 15 ? "nextbuttonPH" : "nextbuttonP"}
                        onClick={()=>window.scrollTo({top: "300px", behavior: "smooth"})}
                        >Next Page</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Pages;
