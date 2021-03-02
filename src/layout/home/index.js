import React, {useState} from 'react';

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import HeroSection from "../../components/heroSection";
import InfoSections from "../../components/infoSection";
import Services from "../../components/services";
import Footer from "../../components/footer";

import {homeObjOne} from "../../components/infoSection/Data";
import {homeObjTwo} from "../../components/infoSection/Data";
import {homeObjThree} from "../../components/infoSection/Data";
import {homeObjFour} from "../../components/infoSection/Data";


const Home = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Footer />
        </>
    );
};

/*

            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HeroSection />
            <InfoSections {...homeObjOne} />
            <InfoSections {...homeObjTwo} />
            <InfoSections {...homeObjThree} />

            <Services />
            
            <InfoSections {...homeObjFour} />
            <Footer />

*/

export default Home;