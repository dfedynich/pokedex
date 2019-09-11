import { GoogleApiWrapper } from 'google-maps-react';
import {GOOGLE_API_KEY} from "../../services/api/API";
import GeoMap from './GeoMap';


export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(GeoMap);