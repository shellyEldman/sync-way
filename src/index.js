import React from 'react';
import ReactDOM from 'react-dom';
import AppManager from './AppManager';
import AppClient from './AppClient';
import './App.css';
import Register from './components/auth/register';
import Login from './components/auth/login';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route, withRouter, Redirect} from "react-router-dom";

import rootReducer from './store/reducers/rootReducer';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {getFirestore, reduxFirestore} from "redux-firestore";
import {getFirebase, reactReduxFirebase} from "react-redux-firebase";
import fbConfig from './config/firebase';


const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {attachAuthIsReady: true})
    )
);


class Root extends React.Component {
    state = {
        mapReady: false
    };

    componentDidMount() {
        this.renderMap();
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         const path = "/" + user.displayName;
        //         this.props.history.push(path);
        //     }
        // });
    }

    renderMap = () => {
        window.initMap = this.initMap;
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDkGQRTym8qgE012k-pSvaGsInLOljuaRs&callback=initMap&language=he&region=IL&libraries=places");
    };

    initMap = () => {
        this.setState({mapReady: true})
    };

    render() {
        return (
            <Switch>
                <Route path="/manager" render={(props) => <AppManager {...props} mapReady={this.state.mapReady} />}/>
                <Route path="/client" render={(props) => <AppClient {...props} mapReady={this.state.mapReady} />}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route render={() => <Redirect to="/login" />}/>
            </Switch>
        );
    }
}


const RootWithAuth = withRouter(Root);


function loadScript(url) {
    const index = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}


store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <RootWithAuth/>
            </Router>
        </Provider>, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
