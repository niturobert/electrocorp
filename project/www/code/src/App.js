import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useState} from 'react'

// Import the views.
import LoginScreen from './views/Login'
import RegisterScreen from './views/Register'
import ArchiveScreen from './views/Archive'
import DashboardScreen from './views/Dashboard'
import TestScreen from './views/Test'
import LogoutScreen from './views/Logout'
import LandingScreen from './views/Landing'


// Import the error views.
import Error404 from './views/Error404'


// The code
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <LandingScreen />
                </Route>

                <Route exact path='/login'>
                    <LoginScreen />
                </Route>

                <Route exact path='/register'>
                    <RegisterScreen />
                </Route>

                <Route exact path='/dashboard'>
                    <DashboardScreen />
                </Route>

                <Route exact path='/archive'>
                    <ArchiveScreen />
                </Route>

                <Route exact path='/test'>
                    <TestScreen />
                </Route>

                <Route exact path='/logout'>
                    <LogoutScreen />
                </Route>

                <Route path='*'>
                    <Error404 />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
