// import React from "react";
import { AddGame } from '../components/AddGame.jsx';
import GameCard from "../components/GameCard.jsx";
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import { configure, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { useParams } from "react-router";
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import thunk from "redux-thunk";
import { genres, platforms, primeraLista } from "../actions"
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../store/index.js"

configure({ adapter: new Adapter() });

const game = {
  games: {
    id: 1,
    name: "WoW",
    slug: "wow",
    description: "Alliance vs Horde",
    genre: ["MMORPG"],
    releaseDate: "2004",
    platform: ["PC"]
  }
}

const genre = {
  genresList: ["Action"]
}

const plat = {
  platformsList: ["PC"]
}

describe('<AddGame />', () => {

  describe('Estructura', () => {
    

    beforeEach(() => {
      var wrapper;    
    var store;
    const mockStore = configureStore([thunk], genres, platforms, primeraLista)
    store = mockStore([], genres, platforms, primeraLista)
    store.clearActions();
    store.dispatch(genres, platforms, primeraLista)
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AddGame />
          </MemoryRouter>
        </Provider>
      )
    })

    xit('Renderiza un <img>', () => {
      expect(wrapper.find("input")).toHaveLength(1)
    })

    xit('Renderiza un <input>', () => {
      expect(wrapper.find("input")).toHaveLength(1)
    })

    xit('Renderiza un <Link>', () => {
      expect(wrapper.find('Link')).toHaveLength(1)
    })

  })

})




  // xtest('Renderiza un div', () => {
  //     let store
  //     const match = {params: {name: "wow"}, isExact: true, path: "/videogame/:name", url: "/videogame/wow"};
  //     const middlewares = []
  //     const mockStore = configureStore(middlewares);
  //     store = mockStore([]);
  //       render(
  //         <GameDetail match={match} store={store}/>
  //       );
  //     const Home = screen.getByText(/Henry Games/i);
  //     expect("div").toBeInTheDocument();
  //   });  












// xtest('Renderiza un div', () => {
//     let store
//     // const match = {params: {name: "wow"}, isExact: true, path: "/videogame/:name", url: "/videogame/wow"};    
//     const middlewares = []
//     const mockStore = configureStore(middlewares);
//     store = mockStore([]);
//       render(
//         <AddGame store={store}/>
//       );
//     const AddGame = screen.getByText(/Nombre/i);
//     expect(AddGame).toBeInTheDocument();
//   });

