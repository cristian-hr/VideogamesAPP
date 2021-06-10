import {useEffect} from 'react';
import './App.css';
import { Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import { platforms, genres } from "./redux/actions"
import Home from "./components/Home/Home";
import SearchBar from "./components/SearchBar/SearchBar";
import Main from "./components/Main/Main";
import GameDetail from "./components/GameDetail/GameDetail";
import SearchList from "./components/SearchList/SearchList";
import Pages from "./components/Pagination/Pages";
import AddGame from "./components/AddGame/AddGame";


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
      <Route path="/search"component={SearchBar}/>
      <Route path="/addgame"component={SearchBar}/>
      <div className="App2">
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
