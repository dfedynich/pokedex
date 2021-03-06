import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ProfileLayout from './../../layouts/ProfileLayout';
import localStorageCacheDecorator from "../../services/decorators/localStorageCacheDecorator";
import ApiRequest from "../../services/api/ApiRequest";
import Fetcher from "../../components/Fetcher";
import PokemonProfileSummary from './components/PokemonProfileSummary/PokemonProfileSummary';
import PokemonProfileLocation from './components/PokemonProfileLocation/PokemonProfileLocation';
import styled from 'styled-components';

const StyledPokemonProfile = styled.section`
  display: flex;
  justify-content: center;
`;

export default class PokemonProfile extends PureComponent {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                pokemonId: PropTypes.string
            })
        }).isRequired
    };

    constructor(props) {
        super(props);

        this.localStorageBagKey = 'pokemonBag';
        this.pokemonId = +props.match.params.pokemonId;
        this.apiRequest = ApiRequest.createPokemonApiRequest();
        this.getOneRequest = localStorageCacheDecorator({
            key: 'pokemonProfiles',
            id: props.match.params.pokemonId,
            func: this.apiRequest.endpoints.pokemons.getOne
        });

        this.state = {
            isInBag: this.isInBag()
        };

        this.handleCheckboxBagChange = this.handleCheckboxBagChange.bind(this);
    }

    handleCheckboxBagChange(isChecked) {
        this.setState({isInBag: isChecked}, () => {
            const pokemonBag = JSON.parse(localStorage.getItem(this.localStorageBagKey) || '[]');
            const newPokemonBag = isChecked
                ? [...pokemonBag, this.pokemonId]
                : pokemonBag.filter(x => x !== this.pokemonId);

            localStorage.setItem(this.localStorageBagKey, JSON.stringify(newPokemonBag));
        })
    }

    isInBag() {
        const bag = JSON.parse(localStorage.getItem(this.localStorageBagKey) || '[]');
        return bag.includes(this.pokemonId);
    }

    render() {
        return (
            <StyledPokemonProfile>
                <Fetcher request={() => this.getOneRequest({id: this.pokemonId})}>
                    {({data, isLoading, error}) => {
                        if (error) {
                            return 'N/A';
                        }

                        if (isLoading) {
                            return 'Loading...';
                        }

                        if (!data) {
                            return 'No Data yet...';
                        }

                        return <ProfileLayout
                            summary={<PokemonProfileSummary
                                name={data.name}
                                isInBag={this.state.isInBag}
                                onCheckboxBagChange={this.handleCheckboxBagChange}
                                imageUrl={data.sprites.front_default}
                                height={data.height}
                                width={data.width}
                                types={data.types.map(type => type.type.name)}
                                abilities={data.abilities.map(ablty => ablty.ability.name)}
                            />}
                            location={<PokemonProfileLocation pokemonId={this.pokemonId}/>}
                            description={POKEMON_DESCRIPTION}
                        />
                    }}
                </Fetcher>
            </StyledPokemonProfile>
        )
    }
}

const POKEMON_DESCRIPTION = `This strange and uncommon creature is a type of aquatic mammal. It's about the size of a tuna, has two side fins, a short, streamlined dorsal fin and a short, powerful tail. They have a thin, rough skin which is usually either dark brown, orange or light purple or a combination of these colors.

They live in large lakes and are extremely common. They're carnivores and their large, long mouths, their teeth and short tongue are ideal for eating fish. They're nocturnal and rely on their sense of smell and sight to get around. They do have small, round ears, but their hearing is not impressive.
They have wide noses and odd, but interesting eyes. Their heads are small and thin in comparison to their bodies.

They make sounds ranging from very low pitched to fairly high pitched and have a very limited range of sounds they make to indicate discoveries, dangers and otherwise communicate with each other. These creatures are gentle and they tend to let their territory be taken be stronger creatures. They mate once a year and they mate with a specificly selected partner for life. Which, with their fairly long lifespans, is quite common among other species as well.
`;


