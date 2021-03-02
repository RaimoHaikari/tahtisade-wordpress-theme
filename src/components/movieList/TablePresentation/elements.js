import styled from 'styled-components';
import {FaTimes} from "react-icons/fa";


/* 
 * React styled-components: refer to other components
 * https://stackoverflow.com/questions/45841265/react-styled-components-refer-to-other-components
 */


export const Table = styled.table`
    border-collapse: collapse; 

    width: 100%;
    table-layout: fixed;
    font-size: 0.9em;

    /* border-radius: 5px 5px 0 0; */
    overflow: hidden;
`;

export const THEAD = styled.thead`
    background-color: #009879;
    color: #fff;
`;


/*
content: '${props => props.icon }';
*/
export const TH = styled.th`
    display: table-cell;
    padding: 10px;
    text-align: left;

    color: ${props => props.sortingField ? "navy" : "black"};;
    cursor: ${props => props.sortable ? "pointer" : "default"};

    &:before {
        display: none;
    }

    @media screen and (max-width: 767px){
        display:none;
    }
`;

export const TBODY = styled.tbody``;

export const TR = styled.tr`

    border-bottom: 1px solid #dddddd;

    &:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    &:last-of-type {
        border-bottom: 2px solid #009879;
    }
`;


/*
 * https://stackoverflow.com/questions/46339034/how-to-render-pseudo-before-content-dynamically-in-styled-component
 */
export const TD = styled.td`
    /* border: solid 1px #ccc; */
    display: table-cell;
    padding: 10px;
    text-align: left;

    &:before {
        display: none;
    }

    @media screen and (max-width: 767px){

        display:block;

        &:first-child {
            padding-top: .5em;
        }

        &:last-child {
            padding-bottom: .5em;
        }

        &:before {
            content: '${props => props.before }';
            font-weight: bold;
            width: 6.5em;
            display: inline-block;
            
        }
    }
`;