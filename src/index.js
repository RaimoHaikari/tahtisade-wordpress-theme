import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {Provider} from "react-redux"

import store from "./store"

import App from './App';


/*
 * Basenamen määrittelyyn pitää saada tunnistus ollaanko kotona vai tuotantoversiossa
 *
 * Ilmeisesti router pitää olla pystyssä, ennen kuin reititettäviä komponentteja aletaan esittelemään
 * - https://stackoverflow.com/questions/63712504/react-router-v5-1-0-cannot-read-property-location-of-undefined
 * 
 */
ReactDOM.render(
  <Provider store={store}>
    <Router basename="/tahtisade">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
