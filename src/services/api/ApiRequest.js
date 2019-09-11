import {API_POKEMON_HOST_URL, API_POKEMON_ENDPOINTS_MAP, API_POKEMON_LOCATION_HOST_URL, LOCATION_API_KEY, API_POKEMON_LOCATION_ENDPOINTS_MAP} from "./API";

export default class ApiRequest {
    constructor({ hostUrl }){
        this.hostUrl = hostUrl;
        this.endpoints = {}
    }

    addEndpoints({name, path, options}) {
        this.endpoints[name] = this.createBasicGetEndpoints({path, options});
    }

    createBasicGetEndpoints( {path, options} ) {
        const endpoints = {};

        const resourceURL = `${this.hostUrl}/${path}`;

        endpoints.getAll = async ({ params={}, config={} }) => {
            const fetchOptions = {...options, ...config};
            const fetchUrl = new URL(resourceURL);

            Object.entries(params).forEach(param => {
                fetchUrl.searchParams.set(param[0], param[1]);
            });


            const response = await fetch(fetchUrl.toString(), fetchOptions);
            const json = await response.json();

            return json;
        };

        endpoints.getOne = async ({ id, config={} }) => {
            const fetchOptions = {...options, ...config};
            const fetchUrl = new URL(`${resourceURL}/${id}`);

            const response = await fetch(fetchUrl.toString(), fetchOptions);
            const json = await response.json();

            return json;
        };

        return endpoints;

    }

    static createPokemonApiRequest() {
        const apiRequest = new ApiRequest({hostUrl: API_POKEMON_HOST_URL});

        Object.entries(API_POKEMON_ENDPOINTS_MAP).forEach(endpoint => {
            apiRequest.addEndpoints({name: endpoint[0], path: endpoint[1]});
        });

        return apiRequest;
    }

    static createPokemonLocationApiRequest() {
        const apiRequest = new ApiRequest({hostUrl: API_POKEMON_LOCATION_HOST_URL});

        Object.entries(API_POKEMON_LOCATION_ENDPOINTS_MAP).forEach(endpoint => {
            apiRequest.addEndpoints({
                name: endpoint[0],
                path: endpoint[1],
                options: {
                    headers: {
                        'x-api-key': LOCATION_API_KEY
                    },
                }
            });
        });

        return apiRequest;
    }

    static createGetApiRequest({ url, params={}, options={} }) {
        return async () => {
            const fetchUrl = new URL(url);

            Object.entries(params).forEach(param => {
                fetchUrl.searchParams.set(param[0], param[1]);
            });


            const response = await fetch(fetchUrl.toString(), options);
            const json = await response.json();

            return json;
        };
    }
}