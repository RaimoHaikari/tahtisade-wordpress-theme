import React, {useState} from 'react';

import {Button} from "../ButtonElement";
import Video from "../../videos/video.mp4";


import {
    ArrowForward,
    ArrowRight,
    HeroContainer,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    HeroBg,
    VideoBg
} from "./heroElements";

/*
 */
const HeroSections = () => {

    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    }

    return (
        <HeroContainer id="home">

            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>

            <HeroContent>
                <HeroH1>Virtual Banking Made Easy</HeroH1>
                <HeroP>
                    Sign up for a new account today and receive $250 in
                    credit towards your next payment.
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        to="signup"
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        primary={'false'}
                        dark={'true'}
                        duration={500}
                        spy={'true'}
                        exact='true'
                        offset={-80}
                        smooth={'true'}
                    >
                        Get startet {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>

        </HeroContainer>
    );
};

export default HeroSections;