import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css"

function Home() {

  return (
    <div data-testid="background" className="maindivH">
      <div className="cont1divH">
        <div className="titledivH">
          <h1>Henry Games</h1>
        </div>
        <div className="enterdivH">
          <Link id="linkH" to="/videogames">
            <input id="inputH" type="submit" value="Enter" />
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Home;