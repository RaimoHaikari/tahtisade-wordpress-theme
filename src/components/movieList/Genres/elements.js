import styled from 'styled-components';

import themes from '../../generalLayout/theme'

/*
 * w3schools
 *
 * How TO - Custom Checkbox
 * https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
 */
export const CONTAINER = styled.div``;

export const SPAN = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: ${props => props.theme.default.checkBoxSize};
    width: ${props => props.theme.default.checkBoxSize};
    background-color: #eee;

    &:after {
        content: "";
        position: absolute;
        display: none;      
    }
`;

/* Hide the browser's default checkbox */
export const INPUT = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ SPAN {
        background-color: #2196F3;
    }
`;


/* 
 * Customize the label (the container)
 * ~ Otsikkoteksi
 */
export const LABEL = styled.label`
    display: block;
    position: relative;
    padding-left: 24px;
    margin-bottom: 6px;
    cursor: pointer;
    font-size: ${props => props.theme.default.fontSize};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

border: 1px solid red;

    &:hover INPUT ~ SPAN {
        background-color: #ccc;
    }

    /* ~ VALINTAMERKKI */
    ${SPAN}:after {
        left: 5px;
        top: 0px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    ${INPUT}:checked ~ ${SPAN}:after {
        display: block;
    }
`;


