import styled from "styled-components";

export const Container = styled.div`
    padding: 0 0 10px 0;
    font-size: ${props => props.theme.fontSize};
`;

export const FormGroup = styled.div`

    display: flex;
    flex-direction: row; 

  
    @media screen and (max-width: ${props => props.theme.breakPoints.xl}){
        flex-direction: column; 
    } 

    @media screen and (max-width: ${props => props.theme.breakPoints.md}){
        flex-direction: row; 
    }  
    
    @media screen and (max-width: ${props => props.theme.breakPoints.sm}){
        flex-direction: column;
    }
`;

/*
 * - If both items are set to flex-shrink:1, they will both take up half of the viewport (they shrink equally to 50%)
 * - If both are items set to flex-shrink:0, neither will shrink and they will both take up 100% of the viewport width, growing the width of the flexbox to twice that of the viewpor
 */
export const RadioColName = styled.div`

    margin-bottom: 5px;
    margin-right: 5px;

    align-self: flex-start;

`

export const SettingsLabel = styled.label`
    font-weight: bold;
    margin: 0;
`;

/*

 */
export const RadioColValue = styled.div`

    flex: 1; 

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    overflow: hidden;
    border-radius: 0px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);

    @media screen and (min-width: 400px){
        /* flex-direction: row; */
    }

    @media screen and (min-width: 576px){
        /* flex-direction: column; */
    }

`

export const RadioWrapper = styled.div`
    flex: 1;   
`;


export const RadioLabel = styled.label`
   
    padding: 4px 4px;
    margin: 0px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;

    display: block;
    width: 100%;
    max-width: 100%;

    /* background: ${props => props.theme.bgSecondary}; */
    /* color:   ${props => props.theme.bgLight}; */

    background: ${props => props.theme.bgLight};
    color: ${props => props.theme.txtGray};
    cursor: pointer;

    transition: background 0.1s;
`;

export const RadioInput = styled.input`
    display: none; 

    &:checked + ${RadioLabel} {
        background: ${props => props.theme.bgPrimary};
        color: ${props => props.theme.txtWhite};
        cursor: default;
    }
`
