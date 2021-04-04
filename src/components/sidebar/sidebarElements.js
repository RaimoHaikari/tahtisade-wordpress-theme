import styled from "styled-components";
import {Link as LinkRouter} from "react-router-dom";

import {FaTimes} from "react-icons/fa";

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;

    background: ${props => props.theme.backgroundColor};;

    display: grid;
    align-items: center;
    top: 0;
    left: 0:
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '100%' : '0')};
    top:  ${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

export const CloseIcon = styled(FaTimes)`
    color: ${props => props.theme.sidebar.txtColor};;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: ${props => props.theme.sidebar.fontSize};;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div``;

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-aligh: center;

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(6, 80px);
    }    
`;


export const Linkki = styled(LinkRouter)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.theme.sidebar.fontSize};;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: ${props => props.theme.sidebar.txtColor};;
    cursor: pointer;

    &:hover {
        color:  ${props => props.theme.sidebar.txtHover};;
        transition: 0.2s ease-in-out;
    }
`;
