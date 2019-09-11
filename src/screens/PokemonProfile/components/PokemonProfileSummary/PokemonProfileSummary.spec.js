import React from 'react';
import { mount } from 'enzyme';
import PokemonProfileSummary from './PokemonProfileSummary';

const props = {
    name: 'bulbasaur',
    height: 7,
    width: 7,
    types: ['poison', 'grass'],
    abilities: ['Chlorophyll', 'Overgrow'],
    isInBag: false,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    onCheckboxBagChange: jest.fn()
};


describe('PokemonProfileSummary', () => {

    it('should render PokemonProfile with uppercase Name', () => {
        const upperCaseName = props.name.charAt(0).toUpperCase() + props.name.slice(1);
        const wrapper = mount(<PokemonProfileSummary {...props} />);

        expect(wrapper.find('h2').text()).toEqual(upperCaseName);
    });

    it('should toggle "In Bag" checkbox', () => {
        const wrapper = mount(<PokemonProfileSummary {...props}  />);

        wrapper
            .find({ type: 'checkbox' })
            .simulate('change',{ currentTarget: { checked: true } });

        expect(props.onCheckboxBagChange).toBeCalledWith(true);

        wrapper.setProps({ isInBag: true });
        const checkbox = wrapper.find({ type: 'checkbox' });

        expect(checkbox.props().checked).toEqual(true);

    });
});



