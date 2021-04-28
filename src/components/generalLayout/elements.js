import styled from 'styled-components';

/*
 * 
 */
export const Container = styled.div`
    background: ${props => props.theme.backgroundColor};
`;

/*
 * L U E T T E L O T
 * 
 * - E L O K U V A T
 * - G E N R E T
 * - A R V O S T E L I J A T
 */
export const PaginationAndSearch = styled.div`

    padding-top: ${props => props.theme.navbar.height};
    padding-right: 2px;
    padding-bottom: 2px;
    padding-left: 2px;

    display: flex;

    & .paginationContainer {
        margin-right: auto;
    }
`;

export const ContentWrap = styled.div`

    color: ${props => props.theme.defaultTextColor};
    display: flex;

    padding: 10px 2px 48px 2px;

    /*
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    */

    @media screen and (max-width: 800px){
        flex-direction: column;
    }
`;

export const Main = styled.main`
    margin: 2px;
    background-color: ${props => props.theme.bgLight};
    flex: 4;
`;

export const Aside = styled.aside`
    margin: 2px;
    background-color: yellow;
    flex: 1;

    @media screen and (max-width: 800px){
        flex-direction: column;
        order: -1;
    }
`;