import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPokemonProfileLocation = styled.section`    
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    
    & > * {
      margin: 2px 0;
    }
`;

const Avatar = styled.img`
  height: 250px;
  margin: 0 auto;
`;

const Name = styled.h2`
  justify-content: center;
  margin: 0 auto;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: baseline;
  font-weight: 600;
`;

const Checkbox = styled.input.attrs(() => ({
    type: "checkbox"
}))`
  margin-left: 10px;
`;

const SummaryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  
  & > * {
    padding: 0 5px;
  }
`;

const uppercaseFirstLetter = (text) => (
    text.charAt(0).toUpperCase() + text.slice(1)
);

export default class PokemonProfileSummary extends PureComponent {

    constructor(props) {
        super(props);

        this.handleCheckboxBagChange = this.handleCheckboxBagChange.bind(this);
    }

    handleCheckboxBagChange(event) {
        this.props.onCheckboxBagChange(!this.props.isInBag);
    }

    render() {
        return (
            <StyledPokemonProfileLocation>
                <Name>{uppercaseFirstLetter(this.props.name)}</Name>
                <Avatar alt={this.props.name} src={this.props.imageUrl}/>
                <div>
                    <Label>Height: </Label>
                    {this.props.height}
                </div>
                <div>
                    <Label>Width: </Label>
                    {this.props.height}
                </div>
                <Label>
                    <span>In Bag</span>
                    <Checkbox
                        checked={this.props.isInBag}
                        onChange={this.handleCheckboxBagChange}
                    />
                </Label>
                <div>
                    <Label>Types: </Label>
                    <SummaryList>
                        {this.props.types.map((type, index) => (
                            <li key={index}>
                                {uppercaseFirstLetter(type)}
                            </li>
                        ))}
                    </SummaryList>
                </div>
                <div>
                    <Label>Abilities: </Label>
                    <SummaryList>
                        {this.props.abilities.map((type, index) => (
                            <li key={index}>
                                {uppercaseFirstLetter(type)}
                            </li>
                        ))}
                    </SummaryList>
                </div>

            </StyledPokemonProfileLocation>
        );
    }
}


