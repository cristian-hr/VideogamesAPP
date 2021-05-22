import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import thunk from "redux-thunk";

import App from "../App";
import SearchBar from "../components/SearchBar.jsx"
import Home from "../components/Home.jsx"
import Main from "../components/Main.jsx"
import SearchList from "../components/SearchList.jsx"
import AddGame from "../components/AddGame.jsx"
import Pages from "../components/Pages.jsx"
import GameDetail from "../components/GameDetail"
import { genres, platforms, primeraLista } from "../actions"
import sinon from 'sinon';

configure({ adapter: new Adapter() });


describe("App", () => {
  let store
  const mockStore = configureStore([thunk])  
  

  beforeEach(() => {
    store = mockStore([])
    // store.clearActions();
    // store.dispatch(genres, platforms, primeraLista)
  });

  describe("El componente SearchBar", () => {

    it("debe renderizar en las rutas /videogames.", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/videogames"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );      
      expect(wrapper.find(SearchBar)).toHaveLength(1);
    })

    it("debe renderizar en las rutas /search.", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/search"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(SearchBar)).toHaveLength(1);
    })


    it("debe renderizar en las rutas /addgame.", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/addgame"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(SearchBar)).toHaveLength(1);
    })
  })


  it("El componente Home debería renderizarse solo en la ruta '/'.", () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ "/" ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(SearchBar)).toHaveLength(0);
      expect(wrapper.find(Main)).toHaveLength(0);
      expect(wrapper.find(SearchList)).toHaveLength(0);
      expect(wrapper.find(Pages)).toHaveLength(0);
      expect(wrapper.find(AddGame)).toHaveLength(0);

  });


  it("El componente SearchList debería renderizarse solo en la ruta '/search'.", () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ "/search" ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(SearchBar)).toHaveLength(1);
      expect(wrapper.find(Main)).toHaveLength(0);
      expect(wrapper.find(SearchList)).toHaveLength(1);
      expect(wrapper.find(Pages)).toHaveLength(0);
      expect(wrapper.find(AddGame)).toHaveLength(0);

  });

  it("El componente Pages debería renderizarse solo en la ruta '/videogames/page/:number'.", () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ "/videogames/page/2" ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(SearchBar)).toHaveLength(1);
      expect(wrapper.find(Main)).toHaveLength(0);
      expect(wrapper.find(SearchList)).toHaveLength(0);
      expect(wrapper.find(Pages)).toHaveLength(1);
      expect(wrapper.find(AddGame)).toHaveLength(0);

  });

  it("El componente AddGame debería renderizarse solo en la ruta '/addgame'.", () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ "/addgame" ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(SearchBar)).toHaveLength(1);
      expect(wrapper.find(Main)).toHaveLength(0);
      expect(wrapper.find(SearchList)).toHaveLength(0);
      expect(wrapper.find(Pages)).toHaveLength(0);
      expect(wrapper.find(AddGame)).toHaveLength(1);

  });
  
  it("El componente GameDetail debería renderizarse solo en la ruta '/videogames/game'.", () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ "/videogames/game" ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(SearchBar)).toHaveLength(1);
      expect(wrapper.find(Main)).toHaveLength(0);
      expect(wrapper.find(SearchList)).toHaveLength(0);
      expect(wrapper.find(Pages)).toHaveLength(0);
      expect(wrapper.find(AddGame)).toHaveLength(0);
      expect(wrapper.find(GameDetail)).toHaveLength(1);

  });





})



 // it("renders learn react link", () => {
  //   let store
  //   const middlewares = []
  //   const mockStore = configureStore(middlewares);
  //   store = mockStore([]);
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={["/"]}>
  //         <App />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   const Home = screen.getByText(/Henry Games/i);
  //   expect(Home).toBeInTheDocument();
  // });
