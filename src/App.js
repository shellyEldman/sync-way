import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ManagerDashboard from './components/manager/managerDashboard';

import Navbar from "./components/navbar/navbar";
import AllRides from "./components/manager/rides/allRides";
import AllDrivers from './components/manager/drivers/allDrivers';
import AllCustomers from './components/manager/customers/allCustomers';
import AllCars from './components/manager/cars/allCars';
import Menu from "./components/manager/menu";
import AddNew from './components/manager/rides/newRide/addNew';
import './App.css';



class App extends React.Component {
    state = {
        mapReady: false
    };

    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        window.initMap = this.initMap;
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDVhyGW6H0nSHMSVMR9MlLhcTRCL42R1BI&callback=initMap&language=he&region=IL&libraries=places");
    };

    initMap = () => {
        this.setState({mapReady: true})
    };

    render() {
        return (
            <BrowserRouter>
                {this.state.mapReady && (
                    <div className="App">

                        <div className="manager-dashboard">
                            <Navbar/>

                            <div className="content d-flex flex-row-reverse">
                                <div className="content-status bg-light text-dark">
                                    <Switch>
                                        <Route exact path="/" component={ManagerDashboard}/>
                                        <Route path="/rides/new" component={AddNew}/>
                                        <Route path="/rides" component={AllRides}/>
                                        <Route path="/drivers" component={AllDrivers}/>
                                        <Route path="/cars" component={AllCars}/>
                                        <Route path="/customers" component={AllCustomers}/>
                                    </Switch>
                                </div>
                                <Menu/>
                            </div>

                        </div>
                    </div>
                )}
            </BrowserRouter>
        );
    }
}


function loadScript(url) {
    const index = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default App;
