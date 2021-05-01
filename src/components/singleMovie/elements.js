import styled from 'styled-components';
import {Link} from "react-router-dom"

export const CONTAINER = styled.div`
    padding: 0;
    margin: 0;

    color: ${props => props.theme.txtDefault};
    background-color: ${props => props.theme.bgLight};
`;

export const H1 = styled.h1`
    font-size: 2.0rem;
    text-align: left;
    margin-bottom: 5px;
`;

export const TABLE = styled.table`
    width: 100%;
    border-collapse: collapse;

    font-size: 1.0rem;

    @media screen and (max-width: 800px){
        display: block;
        width: 100%;
    }
`;

export const TBODY = styled.tbody`
    @media screen and (max-width: 800px){
        display: block;
        width: 100%;
    }
`;

export const TR = styled.tr`

    @media screen and (max-width: 800px){
        display: block;
        width: 100%;
        margin-bottom: 5px;
    }
`;

export const TD = styled.td`

    letter-spacing: 0.35px;
    font-weight: normal;

    padding: 5px;
    vertical-align: top;

    &.movieCardList {
        display: flex;
        flex-wrap:wrap;
    }
    
    &.movieCardTitle {
        font-weight: bold;
    }

    @media screen and (max-width: 800px){
        display: block;
        width: 100%;
    }

`;

export const SPAN = styled.span`
    margin: 0 10px 5px 0;
    white-space:nowrap;
`;

export const LINKKI =  styled.a`
    background-color:  ${props => props.backgroundColor};
    color: ${props => props.color};
    text-decoration: none;
    padding: 5px;
    margin-right: 10px;
    position: relative;
    display: inline-block;
    border-radius: 2px;
`;

