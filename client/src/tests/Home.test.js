import React from "react";
import { MemoryRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode, getByTestId, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from 'react-dom/test-utils';
import Home from '../components/Home.jsx';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "../background-image/bgcrysis-jpg.jpg";

configure({ adapter: new Adapter() });


describe('<Home />', () => {

    describe('Estructura', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            )
        })
        it('Renderiza un <h1>', () => {
            expect(wrapper.find('h1')).toHaveLength(1)
        })

        it('Renderiza un <input>', () => {
            expect(wrapper.find('input')).toHaveLength(1)
        })

        it('Renderiza un <Link>', () => {
            expect(wrapper.find('Link')).toHaveLength(1)
        })

    })

    describe("Redirección", () => {

        let container;

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterEach(() => {
            document.body.removeChild(container);
            container = null;
        });

        xit("El boton enter te redirecciona a Main", () => {

            // let wrapper;
            // wrapper = mount(
            //     <MemoryRouter initialEntries={['http://localhost:3000/']}>
            //         <Home />
            //     </MemoryRouter>,
            //     container
            // )



            // Render app
            act(() => {
                ReactDOM.render(
                    <MemoryRouter initialEntries={['http://localhost:3000/']}>
                        <Home />
                    </MemoryRouter>,
                    container
                );
            })
            const link = container.querySelector('#inputH');

            act(async() => {
               await link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            // const Main = screen.getByText(/Top Games/i);
            // expect(Main).toBeInTheDocument();
            expect(document.body.textContent).toBe('Top Games');

        })

    })

    describe("Imagen de fondo", () => {

        const { container } =
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );

        xit("Debería mostrar una imagen de fondo", () => {
            expect(container.firstChild).toHaveStyle("background-image")

        })
    })


})