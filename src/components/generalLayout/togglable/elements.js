import styled from 'styled-components';
import {FaBoxOpen, FaBoxes} from "react-icons/fa"
import {IoIosClose, IoMdOpen} from "react-icons/io"

export const CONTAINER = styled.div``;

/*
 *
 */
export const BUTTON = styled.button`
    display: block;
    width: 100%;
    border: 1px solid white;
    background-color: ${props => props.theme.bgPrimary}; 
    padding: 0.2rem;
    font-size: 1.0rem;
    cursor: pointer;

    display: flex;
    aling-items: center;
    justify-content: space-between;

`;

export const WRAPPER = styled.div`
    &.hideContent{
        display: none;
    }
`;

export const CloseIcon = styled(IoIosClose)`
    color: #e7d5ff;
    font-size: 1.2rem;

    &.hideIcon{
        display: none;
    }
`;

export const OpenIcon = styled(IoMdOpen)`
    color: #e7d5ff;
    font-size: 1.2rem;

    &.hideIcon{
        display: none;
    }
`;
