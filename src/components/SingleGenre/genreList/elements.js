import styled from 'styled-components';

export const CONTAINER = styled.div`
    background-color: ${props => props.theme.toolbar.backgroundColor}; 
    padding: 5px;

    display: flex;
    flex-direction: column;
`;

export const LABEL = styled.label`

    display: inline-flex;
    align-items: center;
    cursor: pointer;

    font-size: ${props => props.theme.default.fontSize};

    /* margin-right: 10px; */
    margin-bottom: 10px;

    color: ${props => props.disabled ? props.theme.txtGray: "inherit"};

    & > div.radioRadio {
        width: 1.25em;
        height: 1.25em;
        border: ${props => props.disabled ? "2px solid #efedecff": "2px solid #d8e4e2"};
        /* border: 2px solid #d8e4e2; */
        border-radius: 50%;
        margin-right: 10px;

        box-sizing: border-box;
        padding: 2px;
    }

    & > div.radioRadio::after {
        content: "";
        width: 100%;
        height: 100%;
        display: block;

        background-color: #009879;  
        border-radius: 50%;  
        transform: scale(0);
        transition: transform 0.15s;
    }
`;

// .radio__input:checked + .radio__radio::after
// next element....
export const INPUT = styled.input`
    display: none; 

    &:checked + div.radioRadio::after{
        transform: scale(1);
    }
`;