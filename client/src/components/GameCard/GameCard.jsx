import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./GameCard.css"

function GameCard(props) {
    const { genresList } = useSelector(store => store)
    const [imgError, setImgError] = useState(false);

    var genres = props.game?.genre?.join("- / -").split("-").map((g, index) => {
        if (g !== " / ") {
            return <Link key={`GC${index}`} className="linkgenreGC" 
            to={`/videogames?filtroGenero=${genresList.find(gen=> gen.name === g)?.slug}`}>{`${g}`}
            </Link>;
        }
        else {
            return ` ${g} `;
        }
    });

    return (
        <div className="maindivGC">
            <div >
                <div className="divbackimage">
                    <Link className="linkGC" to={`/videogames/${props.game?.slug}`}>
                        <img
                            className="backimage"
                            src={imgError ? "./images/joystick_placeholder.png" : props.game?.image}
                            alt=""
                            onError={(e) => setImgError(true)}
                        />
                    </Link>
                </div>
                <div className="genredivGC">
                    <span>{genres.length > 7 ? [...genres.slice(0,7)," ..."] : genres}</span>
                </div>
                <div className="namedivGC">
                    <Link className="linkGC" to={`/videogames/${props.game?.slug}`}>
                        <span>{props.game?.name.slice(0, 28).length === 28 ?
                            props.game?.name.slice(0, 28) + "..."
                            : props.game?.name.slice(0, 28)}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default GameCard;
