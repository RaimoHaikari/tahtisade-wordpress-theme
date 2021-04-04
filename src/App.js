import React, {useState} from 'react';

import {
    Switch,
    Route
} from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import Home from "./layout/home";
import SignIn from "./layout/SignIn"

import Elokuvat from "./layout/movies";
import Elokuva from "./layout/movie";

import Genret from './layout/genres'

import Footer from "./components/footer";

import "./App.css";

const App = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const padding = {
        padding: 5
    }

    /*
<Sidebar isOpen={isOpen} toggle={toggle} />
<Route path="/elokuvat/:id" component={SingleMovie} />
     */
    return (
        <>

<Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            

            <Switch>

                <Route path="/signin" >
                    <SignIn />
                </Route>

                <Route path="/movies/:id">
                    <Elokuva />
                </Route>

                <Route path="/movies" >
                    <Elokuvat />
                </Route>

                <Route path="/genres" >
                    <Genret />
                </Route>

                <Route path="/" >
                    <Home />
                </Route>      

            </Switch>

        </>
    );
};

/*


            <div>
                <Link style={padding} to="/">Etusivu</Link>
                <Link style={padding} to="/elokuvat">Elokuvat</Link>
                <Link style={padding} to="/uutiset">Uutisia</Link>
            </div>

            <Switch>
                <Route path="/uutiset">
                    <Uutisia />
                </Route>
                <Route path="/elokuvat">
                    <Elokuvat />
                </Route>
                <Route path="/">
                    <FrontPage />
                </Route>
            </Switch>

            <Footer />
*/

export default App;