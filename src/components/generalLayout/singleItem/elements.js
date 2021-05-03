import styled from 'styled-components';

/*
 * Y K S I T T Ä I S E T  K O H T E E T
 * 
 * - E L O K U V A 
 * - G E N R E 
 * - A R V O S T E L I J A 
 */

export const Container = styled.div`
    background: ${props => props.theme.backgroundColor};
`;

export const InfoCardWrapper = styled.div`

    padding-top: ${props => props.theme.navbar.height};
    padding-right: 2px;
    padding-bottom: 2px;
    padding-left: 2px;

    margin: 0px 20px;

    display: flex;

    @media screen and (max-width: ${props => props.theme.breakPoints.md}){
        flex-direction: column;
    }

`;


export const Main = styled.main`

    background-color: ${props => props.theme.bgLight};

    padding-bottom: 10px;

    flex: 2;
    /*
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 600px;
    */

`;

export const Aside = styled.aside`

    background-color: ${props => props.theme.bgLight};

    flex: 1;

    /*
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 400px;
    */

`;