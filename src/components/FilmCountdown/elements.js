import styled, { keyframes } from 'styled-components';

/*
 * Old Fashioned Film Countdown Timer | Pure CSS Animation Effects
 */

const animate = keyframes`
    0% { transform: rotate(-90deg)}
    100% { transform: rotate(270deg)}
`;

const animateNumber = keyframes`
    0%,10% { opacity: 1}
    10.1%,100% { opacity: 0}
`;


export const Container = styled.div`
    width: 100%;
    height: 300px;

    margin: 0;
    padding: 0;
`;

export const BOX = styled.div`
    position: absolute;
    width: inherit;
    height: inherit;

    background: radial-gradient(#fff,#757575);
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        height: 5px;
        background: #000;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 5px;
        height: 100%;
        background: #000;
    }
`;

export const CIRCLE = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 500px;
    height: 500px;
    border: 5px solid #fff;
    border-radius: 50%;
    z-index: 1;

    &.circle1 {}

    &.circle2 {
        width: 600px;
        height: 600px;       
    }

`;

export const NIDDLE = styled.div`
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    height: 4px;
    width: 1200px;

    background: #000;
    animation: ${animate} 1s linear infinite;
    transform-origin: left;
`;

export const NUMBER = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;    

    & > div {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        font-size: 10em;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center; 

        opacity: 0;

        animation: ${animateNumber} 10s linear infinite;

    };

    & > div:nth-child(1) {animation-delay: 0s;}
    & > div:nth-child(2) {animation-delay: 1s;}
    & > div:nth-child(3) {animation-delay: 2s;}
    & > div:nth-child(4) {animation-delay: 3s;}
    & > div:nth-child(5) {animation-delay: 4s;}
    & > div:nth-child(6) {animation-delay: 5s;}
    & > div:nth-child(7) {animation-delay: 6s;}
    & > div:nth-child(8) {animation-delay: 7s;}
    & > div:nth-child(9) {animation-delay: 8s;}
    & > div:nth-child(10) {animation-delay: 9s;}
`;