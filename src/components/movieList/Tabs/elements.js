import styled from 'styled-components';

export const TAB = styled.div`
    overflow: hidden;
    border: none;
    background-color: ${props => props.theme.backgroundColor};
    padding: 5px 0 0 0;
`;

export const BUTTON = styled.button`

    background-color: ${props => props.active ? props.theme.bgLight : props.theme.bgSecondary};
    float: left;

    border-radius: 5px 5px 0px 0px;
    border: none;
    margin-left: 5px;
    outline: none;

    font-size: ${props => props.theme.fontSize};
    color:   ${props => props.active ? props.theme.bgPrimary : props.theme.bgLight};

    cursor: ${props => props.active ? 'default' : 'pointer'};
    padding: 14px 16px;
    transition: 0.3s;

    &:hover {
        background-color: ${props => props.active ? props.theme.bgLight :props.theme.bgHover};
        /* color: ${props => props.active ? props.theme.bgLight :props.theme.bgHover}; */
    }
    
`;

export const CONTAINER = styled.div`
    display: ${props => props.visible ? "block" : "none"};
`;