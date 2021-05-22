import {useEffect} from 'react';
import './App.css';
import { Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import { platforms, genres } from "./actions/index";
import Home from "./components/Home.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Main from "./components/Main.jsx";
import GameDetail from "./components/GameDetail.jsx";
import SearchList from "./components/SearchList.jsx";
import Pages from "./components/Pages.jsx";
import AddGame from "./components/AddGame.jsx";


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(platforms())
    dispatch(genres())
  },[dispatch])

  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route path="/videogames"component={SearchBar}/>
      <div>
        <Route exact path="/videogames" component={Main}/> 

        <Route exact path="/videogames/page/:page" component={Pages}/> 

        <Route exact path="/videogames/:name"component={GameDetail}/>  

        <Route exact path="/search" component={SearchList}/>

        <Route exact path="/addgame" component={AddGame}/>

      </div>
    </div>
  );
}

export default App;
