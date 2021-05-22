import React from "react";
import GameCard from '../components/GameCard.jsx';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


describe('<AddGame />', () => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
          <GameCard />
      )
    })
    it('Renderiza un <img>', () => {
      expect(wrapper.find('img')).toHaveLength(1)
    })

    it('Renderiza dos <span>', () => {
      expect(wrapper.find('span')).toHaveLength(2)
    })

  })

})