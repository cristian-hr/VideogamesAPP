import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import { primeraLista, filterGen, order, filterAdd } from "../../redux/actions";
import Filters from "../Filters/Filters.jsx"
import "./Main.css";

export function Main() {

    const dispatch = useDispatch()

    let queryfiltroGenero = new URLSearchParams(useLocation().search).get("filtroGenero")
    let queryfiltroAdd = new URLSearchParams(useLocation().search).get("filtroAdd")
    let queryOrder = new URLSearchParams(useLocation().search).get("order")

    const {
        gamesList,
        filtradoGen,
        filtradoAdd,
        ordered,
        loading, } = useSelector(store => store)

    var games;
    //trae la primera info del back
    useEffect(() => {
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
                dispatch(order(queryOrder, false, queryfiltroGenero, queryfiltroAdd, false))
            }
        }
        else if (queryfiltroAdd) {
            dispatch(filterAdd(false, queryfiltroGenero, queryfiltroAdd, false))
        }
        else if (queryfiltroGenero) {
            if (!(filtradoGen.find(game => game.page === "1")?.genre === queryfiltroGenero)) {
                dispatch(filterGen(queryfiltroGenero))
            }
        }
        else {
            if (!gamesList.find(game => game.page === "1")) dispatch(primeraLista())
        }
    }
        // eslint-disable-next-line
        , [queryfiltroGenero, queryOrder, queryfiltroAdd])

    //asignacion de los juegos cargados a games
    if (queryOrder) games = ordered.find(game => game.page === "1")?.games;
    else if (queryfiltroAdd) games = filtradoAdd.find(game => game.page === "1")?.games;
    else if (queryfiltroGenero) games = filtradoGen?.find(game => game.page === "1")?.games;
    else games = gamesList?.find(game => game.page === "1")?.games;

    //link siguiente página
    var next = `/videogames/page/2${queryfiltroAdd || queryOrder || queryfiltroGenero ? "?" : ""}${queryfiltroAdd ? "filtroAdd=" + queryfiltroAdd : ""}${queryOrder ? "&order=" + queryOrder : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}`

    if (loading) {
        return (
            <div className="loadingGif"><img className="loadingReact" src="https://media3.giphy.com/media/RJzm826vu7WbJvBtxX/giphy.gif" alt="" /></div>
        )
    }

    var key = 1

    return (
        <div className="bigmaindivM">
            <div className="maindivM">
                <div className="contTopGames">
                    <span className="spanTopGames">Top Games</span>
                    <Filters />
                </div>
                <div className={games?.length === 0 ? "notFound" : "notFoundH" }>No games found :(</div>  
                <div className={games ? "cont1" : "cont1Hide"}>
                    {games?.map(g => <GameCard key={key++}
                        game={g}
                    />)}
                </div>
            </div>
            <Link to={next}>
                <button className={games?.length < 15 ? "nextbuttonMH" : "nextbuttonM"}
                    onClick={() => window.scrollTo({ top: "300px", behavior: "smooth" })}
                >Next Page</button>
            </Link>
        </div>
    )
};

export default Main;
