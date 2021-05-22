import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { details } from "../actions/index.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./GameDetail.css"

function GameDetail() {

    const dispatch = useDispatch();

    const { name } = useParams()
    var genres, desc;

    const gameDesc = useSelector(store => store.details)
    const loading = useSelector(store => store.loading)
    const detailsSS = useSelector(store => store.detailsScreenshots)

    useEffect(() => {
        dispatch(details(name))
        // eslint-disable-next-line
    }, [])

    genres = gameDesc?.genre?.join(" / ").split(" ").map(g => {
        if (g !== "/") {
            return <Link key={`GD${key++}`} className="linkgenreGC" to={`/genres/${g}`}>{`${g}`}</Link>;
        }
        else {
            return ` ${g} `;
        }
    })

    desc = gameDesc?.description?.replace(/<[^>]*>/g, '');


    const [index, setIndex] = useState(0)

    function previous() {
        if (index === 0) setIndex(detailsSS.length - 1);
        else setIndex(index - 1)
    }

    function next() {
        if (index === detailsSS.length - 1) setIndex(0)
        else setIndex(index + 1)
    }

    var key = 1

    if (loading) {
        return (
            <div><img className="loadingReact" src="https://media3.giphy.com/media/RJzm826vu7WbJvBtxX/giphy.gif" alt="" /></div>
        )
    }

    return (
        <div className="bigContGD">
            <h1>{gameDesc?.name}</h1>
            <div className="maindivGD">
                <div className="divimageGD">
                    <img className="imageD" src={detailsSS[index]} alt="" />
                    <div>
                        <button className="prevButtonGD" onClick={previous}>Previus</button>
                        <button className="nextButtonGD" onClick={next}>Next</button>
                    </div>
                </div>
                <div className="textdivGD">
                    <div>
                        Género: {genres}
                    </div>
                    <p className="pDesc">{desc}</p>
                    <p>Fecha de publicación: {gameDesc?.releaseDate}</p>
                    <p>Rating: {gameDesc?.rating}</p>
                    <p>Plataformas: {gameDesc?.platform?.join(" / ").split(" ").map(p => p !== "/" ? p : ` ${p} `)}</p>
                </div>
            </div>
        </div>
    )
}

export default GameDetail;
