/*
 * Responsive FAQ accordion dropdown | HTML and CSS Tutorial
 */
import styled from 'styled-components';
import {Link as LinkRouter} from "react-router-dom";
import {Link as LinkScroll} from "react-scroll";

import {FaBoxOpen, FaBoxes} from "react-icons/fa"

export const A = styled.div`
/*
    overflow: hidden;
    max-height: 0;
    */
    
    position: relative;
    background-color: #ededed;

    
    &:before {
        content: "";
        position: absolute;
        width: .6rem;
        height: 90%;
        

        top: 50%;
        left: 0;
        transform: translateY(-50%);
        
        background-color: #8fc460;
    }
`;

export const Q = styled(LinkRouter)`
    font-size: 1.0rem;
    color: rgba(125,255,255,.8);
    text-decoration: none;
    background-color: #283042;
    width: 100%; /* Jotta koko alue klikattava */

    display: flex;
    aling-items: center;
    justify-content: space-between;

    padding: 1rem 0;
`;

export const W = styled(LinkScroll)`
    font-size: 1.0rem;
    color: rgba(125,255,255,.8);
    text-decoration: none;
    background-color: #283042;
    width: 100%; /* Jotta koko alue klikattava */

    display: flex;
    aling-items: center;
    justify-content: space-between;

    padding: 1rem 0;
`;

export const ACCORDION = styled.div`
    font-size: 12px;

    width: 95%;
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1.5rem;

    border: 1px solid navy;
`;

export const ITEM = styled.div`

    background-color: #eeffee;
    border-radius: .4rem;
    margin-bottom: 1rem;

    padding: 0.5rem;

    &:target ${A} {
        max-height: 20rem;
    }

`;


export const CloseIcon = styled(FaBoxOpen)`
    color: #e7d5ff;
    display: none;
`;

export const OpenIcon = styled(FaBoxes)`
    color: #e7d5ff;
`;