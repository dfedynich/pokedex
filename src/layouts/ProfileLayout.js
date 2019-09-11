import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const StyledProfileLayout = styled.section`    
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    
    & > * {
      margin: 10px 0;
    } 
    
    @media (min-width: 700px) {
        flex-direction: row; 
    }
`;

const Summary = styled.article`
    display: flex;
    flex-direction: column;
    
    flex: initial;
    
`;

const Location = styled.article`
  height: 300px;
  position: relative;
  text-align: center;
  
  margin: 10px 0;
  
  @media (min-width: 700px) {
        height: 500px;
        flex: auto;
        margin-left: 30px;   
  }
`;

const Description = styled.p`
  white-space: pre-line;
`;

export default function ProfileLayout(props) {
    return (
        <StyledProfileLayout>
            <Summary>
                {props.summary}
            </Summary>
            <Location>
                {props.location}
            </Location>
            <Description>
                {props.description}
            </Description>
        </StyledProfileLayout>
    );
}
