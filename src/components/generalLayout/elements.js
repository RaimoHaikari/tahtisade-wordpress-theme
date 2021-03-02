import styled from 'styled-components';

/*
 * background: #101522;
 */
export const Container = styled.div`
    background: navy;
`;

export const ContentWrap = styled.div`
    padding: 80px 2px 48px 2px;

    color: black;
    display: flex;

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
    background-color: white;
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