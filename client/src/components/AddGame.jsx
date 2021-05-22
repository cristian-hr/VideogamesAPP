import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { primeraLista, postGame, destroyGame} from "../actions/index.js";
import SearchBar from "./SearchBar.jsx";
import GameCard from "./GameCard.jsx";
import "./AddGame.css"

export function AddGame(props) {

    const dispatch = useDispatch()

    const {
        genresList,
        platforms,
        gamesList,} = useSelector(store => store)

    const [data, setData] = useState({
        name: "",
        slug: "",
        genre: [],
        image: "",
        description: "",
        releaseDate: "",
        rating: "",
        platform: []
    })

    const [error, setError] = useState({
        errorN: "",
        errorD: "",
        errorP: ""
    })

    function handleInputChange(e) { 
        if (e.target.name === "name") {
            setData({ ...data, name: e.target.value, slug: e.target.value.toLowerCase().split(" ").join("-") }) 
        }
        else {
        setData({ ...data, [e.target.name]: e.target.value }) 
        }
    }
    
    function handleChangePlat(e) {         
        var array = data.platform        
        if(!e.target.checked) array.splice(array.indexOf(e.target.value), 1)
        else array.push(e.target.value)
        setData({ ...data, platform: array}) 
    } 

    function handleChangeGenre(e) { 
        var array = data.genre       
        if(!e.target.checked) array.splice(array.indexOf(e.target.value), 1)
        else array.push(e.target.value)
        setData({ ...data, genre: array}) 
    }
    

    async function postNewGame(e) {
        e.preventDefault()
        var { name, description, platform } = data
        if (!name || !description || !platform[0]) {
            setError({ errorN: !name ? "Falta el nombre" : "", errorD: !description ? "Falta la descripción" : "", errorP: !platform[0] ? "Falta la plataforma/s" : "" })
        }
        else {
            dispatch(postGame(data))
        }
    }

    async function deleteGame(e, g) {
        e.preventDefault()
        dispatch(destroyGame(g))
    }

    useEffect(() => { 
        if (!gamesList.find(game => game.page === "1")) dispatch(primeraLista())              
    },
    [dispatch, gamesList])

    var games
    games = gamesList?.find(game => game.page === "1")?.games;

    var key = 1;

    return (
        <div className="maindivAG">
            <SearchBar location={props?.location} />
            <div className="maindiv2AG">
                <div className="titledivAG">
                    <h1>Add Games</h1>
                </div>
                <div className="cont1AG">
                    <form className="form1AG" onSubmit={(e) => postNewGame(e)}>
                        *Name: <input className="inputsAG" name="name" type="text" onChange={handleInputChange} /><span className={data.name ? "spanNH" : "spanNS"}>{error.errorN}</span>
                        <br />
                        <div>Genre:
                        <br />
                            <div className="genredivAG">
                                {genresList?.sort().map(g =>
                                    <label key={`AG${key++}`}>
                                        <input key={`AG${key++}`} name="genres" type="checkbox" value={`${g.slug}`} onChange={handleChangeGenre} />{`${g.name}`}
                                    </label>
                                )}
                            </div>
                        </div>
                    Image Link: <input className="inputsAG" name="image" type="text" onChange={handleInputChange} />
                        <br />
                    *Desc: <input className="inputsAG" name="description" type="text" onChange={handleInputChange} /> <span className={data.description ? "spanNH" : "spanNS"}>{error.errorD}</span>
                        <br />
                    Release Date: <input className="inputsAG" name="releaseDate" type="text" onChange={handleInputChange} />
                        <br />
                    Rating: <input className="inputsAG" name="rating" type="text" onChange={handleInputChange} />
                        <br />
                        <div>
                            *Platforms: <br />
                            <div className="genredivAG">
                                {platforms?.sort().map(p =>
                                    <label key={`AG${key++}`}>
                                        <input key={`AG${key++}`} name="platform" type="checkbox" value={`${p}`} onChange={handleChangePlat} />{`${p}`}
                                    </label>
                                )}
                            </div><span className={data.platform[0] ? "spanNH": "spanNS"}>{error.errorP}</span>
                        </div>
                        <br />
                        <input type="submit" value="Add game"/>
                    </form>
                    <div >
                        <form className="gamecarddivAG">
                        {games?.filter(g => g.id.toString().includes("henry")).slice(0, 15).map(g =>
                            <div key={`AG${key++}`}>
                                <GameCard
                                    game={g}
                                />
                                <button onClick={(e) => deleteGame(e, g)}>Delete</button>
                            </div>
                        )}                            
                        </form>                        
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddGame;
