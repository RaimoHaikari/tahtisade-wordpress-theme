import styled from 'styled-components';

export const CONTAINER = styled.div`
    width: 100%;
    background-color: ${props => props.theme.bgLight};

    & > div {
        padding: 5px;
    }

`;