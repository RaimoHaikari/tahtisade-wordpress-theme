import styled from "styled-components";
import {Link as LinkRouter} from "react-router-dom";
import {Link as LinkScroll} from "react-scroll";

/*
    background: ${({scrollNav}) => (scrollNav ? '#000' : 'transparent')};
*/
export const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? '#000' : 'transparent')};

    height: ${props => props.theme.navbar.height};
    margin-top: ${props => props.theme.navbar.marginTop};

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.theme.navbar.fontSize};
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    /* justify-content: space-between; */
    height: ${props => props.theme.navbar.height};
    z-index: 1;
    width: 100%;
    padding; 0 24px;
max-width: 1100px;
`;

export const NavLogo = styled(LinkRouter)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 5px;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor:pointer;
        color: #fff;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-left: auto;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavItem = styled.li`
    height:${props => props.theme.navbar.height};
`

export const NavLinks = styled(LinkScroll)`
    color: ${props => props.theme.navbar.txtColor};

    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;

    cursor: pointer;
    

    &.active {
        border-bottom: 3px solid #01bf71;
    }
`

export const Linkki = styled(LinkRouter)`
    color: ${props => props.theme.navbar.txtColor};

    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;

    cursor: pointer;
    
    &.active {
        border-bottom: 3px solid #01bf71;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    } 
`

export const NavBtnLink = styled(LinkRouter)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    curson: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`