/*
 * Otetaan käyttöön index.js -tiedostossa
 * import {ThemeProvider} from "styled-components";
 * 
 *    <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
 */
const theme = {
    backgroundColor: '#411a35',
    defaultTextColor: 'navy',
    bgPrimary: '#5e2750',   // Aktiivinen sivutuspallero
    bgLight: '#fcede8',     // Leipätekstin tausta '#fcede8'
    bgWhite: '#fff',        // Elokuvakuvakkeiden tausta
    bgSecondary: '#c7b3c2', // Passiivinen välilehtiotsikko, taulukon "joka toinen rivi"
    bgHover: '#000',
    txtDefault: 'navy',     // Elokuvakuvakkeiden tekstit, Taulukkolistauksen normaali otsikko
    txtActive: 'red',       // Taulukkolistauksen aktivoitu otsikko
    txtWhite: '#ffffff',
    txtHover: '#fff',
    fontSize: '1em',        // Elokuvakuvakkeen H1, välilehden otsikko
    lineHeight: '2em',
    navbar: {
        height: '80px',
        marginTop: '-80px',
        logoHeight: '70px',
        logoWidth: '70px',
        fontSize: '1.1rem',
        txtColor: 'red'
        ///txtColor: '#ffffff'
    },
    sidebar: {
        txtColor: '#fcede8',
        txtHover: '#000',
        fontSize: '1.1rem',
    },
    default: {
        fontSize: '0.9em',
        checkBoxSize: '1.2em',
    }

}


export default theme;