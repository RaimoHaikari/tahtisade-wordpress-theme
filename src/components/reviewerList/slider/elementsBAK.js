/*
 * Animated Range Slider In HTML, CSS, and Simple JavaScript [TUTORIAL]
 * https://www.youtube.com/watch?v=xDPZUR84D4w
 */
import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.toolbar.backgroundColor};

    border: 1px dotted #cccccc;
    padding: 5px;

    height: 100px;
    width: 100%;

    display: grid;
    text-align: center;
    place-items: center;


    & div.field {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        border: 1px solid green;
    }

    & div.field div.value {
        position: absolute;
        color: black;
    }

    & div.field div.left {
        left: -22px;
    }

    & div.field div.right {
        right: -45px; 
    }

`;

export const SliderValue = styled.div.attrs(props => {

    return {
        left: props.left || "50%",
    }
})`

    border: 1px dotted red;
    position: relative;
    width: 100%;


    & span {
        position: absolute;
        height: 45px;
        width: 100%;
        color: white;
        font-weight: 500;
top: -5px;
transform: translateX(-50%) scale(1);
        transform-origin: bottom;
        transition: transform 0.3s ease-in-out;
        line-height: 35px;
        z-index: 2;
    } 

    & span.show {
        transform: translateX(-50%) scale(1);
        left: 24%;
    }     
    
    & span:after {
        content: "";
        position: absolute;

        height: 35px;
        width: 35px;
        background: red;
 left: ${props => props.left};
 top: -5px;

        transform: translateX(-50%) rotate(45deg);
        border: solid 3px #fff;
        z-index: -1;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
    }

`;

export const Input = styled.input`
    -webkit-appearance: none;
    height: 3px;
    background: #ddd;
    border-radius: 5px;
    outline: none;
    border: none;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        background: black;
        cursor: pointer;
    }

    &::-moz-range-thumb {

    }
`;