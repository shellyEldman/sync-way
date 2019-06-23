import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ManagerDashboard from './components/manager/managerDashboard';

import {connect} from "react-redux";

import Navbar from "./components/navbar/navbar";
import AllRides from "./components/manager/rides/allRides";
import AllDrivers from './components/manager/drivers/allDrivers';
import AllCustomers from './components/manager/customers/allCustomers';
import AllCars from './components/manager/cars/allCars';
import Menu from "./components/manager/menu";
import AddNew from './components/manager/rides/newRide/addNew';
import NewOrders from './components/manager/new_orders/newOrder';


class AppManager extends React.Component {
    render() {
        const {auth, mapReady} = this.props;
        if (!auth.uid) {
            return <Redirect to="/login"/>
        }

        return (
            <React.Fragment>
                    <div className="App">

                        <div className="manager-dashboard">
                            <Navbar/>

                            <div className="content d-flex flex-row-reverse">
                                <div className="content-status bg-light text-dark">
                                    {mapReady && <Switch>
                                        <Route exact path="/manager" component={ManagerDashboard}/>
                                        <Route path="/manager/rides/new" component={AddNew}/>
                                        <Route path="/manager/rides" component={AllRides}/>
                                        <Route path="/manager/drivers" component={AllDrivers}/>
                                        <Route path="/manager/cars" component={AllCars}/>
                                        <Route path="/manager/new_orders" component={NewOrders}/>
                                        <Route path="/manager/customers" component={AllCustomers}/>
                                    </Switch>}
                                </div>
                                <Menu/>
                            </div>

                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(AppManager);
