import React from "react";
import ReactDOM from 'react-dom';
import GameDetail from '../components/GameDetail.jsx';
import { MemoryRouter } from 'react-router-dom';
import {search} from "../actions/index.js"
import thunk from "redux-thunk";

import {genres, platforms, primeraLista} from "../actions"

import { render, unmountComponentAtNode } from "react-dom";
import configureStore from 'redux-mock-store'
import { configure, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

const game = {
    gameDetail: {
        id: 1,
        name: "WoW",
        slug: "wow",
        description: "Alliance vs Horde",
        genre: ["MMORPG"],
        releaseDate: "2006",
        platform: ["PC"]
    }
}


// it('renders correctly enzyme', () => {
//     const wrapper = shallow(<Home />)

//     expect(toJson(wrapper));
//   });




describe('<GameDetail />', () => {
    let wrapper;
    let store;
    // const middlewares = []
    // const name = {params: {name: "wow"}, isExact: true, path: "/videogame/:name", url: "/videogame/WoW"};
    let container = null;
    beforeEach(() => {

        container = document.createElement("div");
        document.body.appendChild(container)


        const mockStore = configureStore([thunk], search)
        store = mockStore([], search)
        store.clearActions();
        store.dispatch(search)
        render(
            <MemoryRouter>
                <GameDetail store={store} />
            </MemoryRouter>,
            container

        )
        
    })

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
      });

    xit('Renderiza un <h1>', () => {
        
        expect(container)
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
})





//   describe('Testing sum', () => {
//     function sum(a, b) {
//        return a + b;
//     }

//     it('should equal 4',()=>{
//        expect(sum(2,2)).toBe(4);
//       })

//     test('also should equal 4', () => {
//         expect(sum(2,2)).toBe(4);
//       }) 
// });





















// test('renders learn react link', () => {
//     render(<GameDetail props={game} />);
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });



// const addTodo = () => ({ type: 'ADD_TODO' })

// it('should dispatch action', () => {

//   // Initialize mockstore with empty state
//   const initialState = {}
//   const store = mockStore(initialState)

//   // Dispatch the action
//   store.dispatch(addTodo())

//   // Test if your store dispatched the expected actions
//   const actions = store.getActions()
//   const expectedPayload = { type: 'ADD_TODO' }
//   expect(actions).toEqual([expectedPayload])
// })