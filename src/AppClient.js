import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import Navbar from "./components/navbar/navbar";
import Menu from './components/client/menu';
import './App.css';
import ClientDashboard from "./components/client/clientDashboard";
import NewRide from './components/client/newRide/newRide';


const AppClient = (props) => {
    const {auth, mapReady} = props;

    if (!auth.uid) {
        return <Redirect to="/login"/>
    }

    return(
        <div className="App">
            <div className="client-dashboard">
                <Navbar/>
                <div className="content d-flex flex-row-reverse">
                    <div className="content-status bg-light text-dark">
                        {mapReady && <Switch>
                            <Route exact path="/client" component={ClientDashboard}/>
                            <Route path="/client/new" component={NewRide}/>
                        </Switch>}
                    </div>
                    <Menu/>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(AppClient);
