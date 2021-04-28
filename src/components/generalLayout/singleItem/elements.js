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

    @media screen and (max-width: 800px){
        flex-direction: column;
    }

`;


export const Main = styled.main`
    margin: 2px;
    background-color: ${props => props.theme.bgLight};
    flex: 2;
`;

export const Aside = styled.aside`
    margin: 2px;
    background-color: yellow;
    flex: 1;

`;