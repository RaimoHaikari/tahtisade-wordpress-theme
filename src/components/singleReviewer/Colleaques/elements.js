import styled from 'styled-components';

export const CONTAINER = styled.div`
    width: 100%;
    background-color: ${props => props.theme.toolbar.backgroundColor};

    & > div {
        padding: 5px;
    }

    & > div.listWrapper {

        max-height: 400px;
        overflow-y: auto;
    }
`;


export const CARD = styled.div`

    color: ${props => props.theme.txtDefault};

    padding: 2px;
    margin-bottom: 5px;
    border-bottom: 1px dotted  ${props => props.theme.bgSecondary};;

    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.bgPrimary};
        color:  ${props => props.theme.txtWhite};
    }

    &.active {
        background-color: ${props => props.theme.bgSecondary};
        color: ${props => props.theme.txtDefault};
        cursor: default;
    }

    & P {
        padding: 5px 0;
    }
`;
