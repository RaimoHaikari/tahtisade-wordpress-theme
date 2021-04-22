import React, {useEffect, useState} from 'react';
import {animateScroll as scroll} from "react-scroll";

import {IconContext} from "react-icons";
import {FaBars} from 'react-icons/fa';

import {Logo} from "./logo"

import {
    MobileIcon,
    Nav, 
    NavbarContainer, 
    NavBtn,
    NavBtnLink,
    NavItem,
    NavLinks,
    Linkki,
    NavLogo,
    NavMenu
} from "./navbarElements"

const Navbar = ({toggle}) => {

    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {

        if(window.scrollY >= 80){
            setScrollNav(true)
        }
        else {
            setScrollNav(false)
        }

    }

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>

                        <NavLogo 
                            onClick={toggleHome}
                            to="/"
                        >
                            <Logo />
                        </NavLogo>

                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>

                        <NavMenu>

                            <NavItem>
                                <Linkki 
                                    to='/movies'
                                >Elokuvatko</Linkki>
                            </NavItem>
                            <NavItem>
                                <Linkki 
                                    to='/genres'
                                >Genret</Linkki>
                            </NavItem>
                            <NavItem>
                                <Linkki 
                                    to='/reviewers'
                                >Kriitikot</Linkki>
                            </NavItem>

                        </NavMenu>

                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;

/*
       <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>

                        <NavLogo 
                            onClick={toggleHome}
                            to="/"
                            >tahtisade</NavLogo>

                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>

                        <NavMenu>

                            <NavItem>
                                <NavLinks 
                                    to='about'
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                    smooth={true}
                                >About</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                    to='discover'
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                    smooth={true}
                                >Discover</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                    to='services'
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                    smooth={true}
                                >Services</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks 
                                    to='signup'
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                    smooth={true}
                                >Sign Up</NavLinks>
                            </NavItem>
                        </NavMenu>

                        <NavBtn>

                            <NavBtnLink to="/movies">
                                Elokuvat
                            </NavBtnLink>
                            
                        </NavBtn>

                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>

*/