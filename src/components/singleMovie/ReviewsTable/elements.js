import styled from 'styled-components';

export const LINKKI =  styled.a`
    background-color:  ${props => props.backgroundColor};
    color: ${props => props.color};
    text-decoration: none;
    padding: 0;
    margin: 0;
    position: relative;
    display: inline-block;
    border-radius: 2px;
`;