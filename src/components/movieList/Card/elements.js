import styled from 'styled-components';

import {Link as LinkRouter} from "react-router-dom";

//import Doctors from "../../../images/undraw_doctors_hwty.svg"
import Doctors from "../../../images/static-assets-upload7099622458029120504.png"


export const WRAPPER = styled.div`
    display: grid;
grid-template-columns: minmax(300px, 1fr);
    justify-content: center;
    grid-gap: 2rem;
    margin: 2rem;

    @media screen and (min-width: 500px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 760px){
        grid-template-columns: repeat(3, 1fr);
    }

`;

export const KONTTI = styled(LinkRouter)`
    box-shadow: 0px 2px 8px 0px gray;
    text-align: center;
    border-radius: 1rem;
    
    position: relative;
    background:  ${props => props.theme.bgWhite};

    overflow: hidden; /* Jotta pyöristys pysyy näkyvissä */

    text-decoration: none;

    &: link {
        color: ${props => props.theme.txtDefault};
    }

    &: visited {
        color: ${props => props.theme.txtDefault};
    }
`;

export const BANNER = styled.div`
    position: absolute;
    height: 10rem;
    width: 100%;
    
    background-image: url(${Doctors});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const PROFILEIMAGE = styled.img`
    width: 8rem;
    clip-path: circle(60px at center); 
    margin-top: 5rem; 
    border: 1px solid blue;
`;

export const H1 = styled.h1`
    font-size: ${props => props.theme.fontSize};
`;

export const P = styled.p`
    margin: 1rem 0.2rem;
    font-size: 0.9rem;
    
    & > span {
        font-weight: 800;
        margin-right: 5px;
    }
`;

export const BUTTON = styled.button`
    width: 100%;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: navy;
    padding: 1rem;
`;