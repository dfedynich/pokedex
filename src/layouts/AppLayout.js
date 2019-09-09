import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const StyledAppLayout = styled.section`
    margin: 1em auto;
    padding: 0 0.5em;
     
    @media (min-width: 700px) {
        max-width: 80vw;
        margin-top: 3em;    
    }
`;

export default function AppLayout(props) {
    return <StyledAppLayout>{props.children}</StyledAppLayout>
}
