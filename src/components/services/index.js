import React from 'react';

import Icon1 from "../../images/undraw_awards_fieb.svg"
import Icon2 from "../../images/undraw_horror_movie_3988.svg"
import Icon3 from "../../images/undraw_movie_night_fldd.svg"

import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesIcon,
    ServicesH2,
    ServicesP
} from "./serviceElements"

/*

*/
const Services = () => {
    return (
        <ServicesContainer id="service">
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper>

                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>Reduce expences</ServicesH2>
                    <ServicesP>
                        We help reduce your fees and increase your overall revenus
                    </ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>Virtual Offices</ServicesH2>
                    <ServicesP>
                        You can access our platform from everywhere in the world
                    </ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>Premium Benefits</ServicesH2>
                    <ServicesP>
                        Nopean tilaajan etuna muoviämpäri käteen ja haskat kaupan päälle!
                    </ServicesP>
                </ServicesCard>

            </ServicesWrapper>
        </ServicesContainer>
    );
};

export default Services;