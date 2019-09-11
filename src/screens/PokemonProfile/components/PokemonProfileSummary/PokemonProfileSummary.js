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
  font-weight: 600;
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

export default function ProfileLayout(props) {

    return (
        <StyledPokemonProfileLocation>
            <Name>{uppercaseFirstLetter(props.name)}</Name>
            <Avatar alt={props.name} src={props.imageUrl} />
            <div>
                <Label>Height: </Label>
                {props.height}
            </div>
            <div>
                <Label>Width: </Label>
                {props.height}
            </div>
            <div>
                <Label>Types: </Label>
                <SummaryList>
                    {props.types.map((type, index) => (
                        <li key={index}>
                            {uppercaseFirstLetter(type)}
                        </li>
                    ))}
                </SummaryList>
            </div>
            <div>
                <Label>Abilities: </Label>
                <SummaryList>
                    {props.abilities.map((type, index) => (
                        <li key={index}>
                            {uppercaseFirstLetter(type)}
                        </li>
                    ))}
                </SummaryList>
            </div>

        </StyledPokemonProfileLocation>
    );
}

const uppercaseFirstLetter = (text) => (
    text.charAt(0).toUpperCase() + text.slice(1)
);
