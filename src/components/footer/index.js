import React from 'react';
import {animateScroll as scroll} from "react-scroll";

import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink,
    FacebookIcon,
    TwitterIcon
} from "./footerElements";

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>

                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Jee</FooterLinkTitle>
                            <FooterLink to="/signin">About</FooterLink>
                            <FooterLink to="/signin">How It Works</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>What</FooterLinkTitle>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        </FooterLinkItems> 
                    </FooterLinksWrapper>

                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Jee</FooterLinkTitle>
                            <FooterLink to="/signin">About</FooterLink>
                            <FooterLink to="/signin">How It Works</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>What</FooterLinkTitle>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        </FooterLinkItems> 
                    </FooterLinksWrapper>

                </FooterLinksContainer>

                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo 
                            onClick={toggleHome}
                            to='/'
                            >Tähtisade</SocialLogo>
                        <WebsiteRights>
                            Tähtisadetta © {new Date().getFullYear()}
                        </WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank" aria-label="Facebook">   
                                <FacebookIcon />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Twitter">   
                                <TwitterIcon />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Facebook">   
                                <FacebookIcon />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Twitter">   
                                <TwitterIcon />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
                
            </FooterWrap>
        </FooterContainer>
    );
};

/*
            <FooterWrap>
                <FooterLinksContainer>

                    <FooterLinksWrapper>

                        <FooterLinkItems>
                            <FooterLinkTitle>Jee</FooterLinkTitle>

                            <FooterLink to="/signin">About</FooterLink>
                            <FooterLink to="/signin">How It Works</FooterLink>
                        </FooterLinkItems>

                        <FooterLinkItems>
                            <FooterLinkTitle>What</FooterLinkTitle>

                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        </FooterLinkItems>                       

                    </FooterLinksWrapper>

                    <FooterLinksWrapper>

                        <FooterLinkItems>
                            <FooterLinkTitle>Jee</FooterLinkTitle>

                            <FooterLink to="/signin">About</FooterLink>
                            <FooterLink to="/signin">How It Works</FooterLink>
                        </FooterLinkItems>

                        <FooterLinkItems>
                            <FooterLinkTitle>What</FooterLinkTitle>

                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                        </FooterLinkItems>                       

                    </FooterLinksWrapper>                   


                </FooterLinksContainer>
            </FooterWrap>

*/

export default Footer;