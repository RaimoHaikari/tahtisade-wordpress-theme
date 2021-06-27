import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${props => props.theme.toolbar.backgroundColor};

    & div#sequence {
        padding: 5px 0 0 2px;
    }

    & div#sequence polygon{
        fill: ${props => props.theme.bgPrimary}; 
`;