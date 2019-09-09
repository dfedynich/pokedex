import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const StyledGalleryLayout = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const GalleryLayoutItem = styled.li`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    width: 120px;
    height: 120px;
    margin: 5px;
    
    @media (min-width: 700px) {
        width: 200px;
        height: 200px; 
        margin: 10px;   
    }
    
`;

export default function GalleryLayout(props) {
    return (
        <StyledGalleryLayout>
            {React.Children.map(props.children, (child, index) => (
                <GalleryLayoutItem key={index}>{child}</GalleryLayoutItem>
            ))}
        </StyledGalleryLayout>
    );
}
