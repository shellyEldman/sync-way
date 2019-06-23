import React from 'react';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";

class Menu extends React.Component {
    state = {
        active: 'home'
    };

    componentDidMount() {
        const path = this.props.location.pathname;

        switch (path) {
            case '/manager':
                this.setState({active: 'home'});
                break;
            case '/manager/new_orders':
                this.setState({active: 'new'});
                break;
            case '/manager/rides':
                this.setState({active: 'ride'});
                break;
            case '/manager/drivers':
                this.setState({active: 'drivers'});
                break;
            case '/manager/cars':
                this.setState({active: 'cars'});
                break;
            case '/manager/customers':
                this.setState({active: 'customers'});
                break;
            case '/manager/reports':
                this.setState({active: 'reports'});
                break;
            default:
                try {
                    const serializedState = localStorage.getItem('active');
                    if (serializedState !== null) {
                        this.setState({active: JSON.parse(serializedState)})
                    }
                } catch (e) {
                    // ignore
                }
        }
    }

    selectActive(selectedActive) {
        this.setState({active: selectedActive});

        // save to local storage
        try {
            const serializedState = JSON.stringify(selectedActive);
            localStorage.setItem('active', serializedState);
        } catch (e) {
            // Ignore write errors;
        }
    };

    render() {
        const {active} = this.state;

        return (
            <React.Fragment>
                <div className="content-info bg-dark text-light pt-4">
                    <NavLink to="/manager">
                        <div onClick={() => this.selectActive('home')}
                             className={`${active === 'home' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-home ml-3"/><span>בית</span>
                        </div>
                    </NavLink>
                    <NavLink to="/manager/new_orders">
                        <div onClick={() => this.selectActive('new')}
                             className={`${active === 'new' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <div>
                                <i className="fas fa-cart-plus ml-3"/><span>הזמנות חדשות</span>
                                <span className="badge badge-pill badge-danger mr-2 pt-1">17</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/manager/rides">
                        <div onClick={() => this.selectActive('ride')}
                             className={`${active === 'ride' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-route ml-3"/><span>נסיעות</span>
                        </div>
                    </NavLink>
                    <NavLink to="/manager/drivers">
                        <div onClick={() => this.selectActive('drivers')}
                             className={`${active === 'drivers' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <div>
                                <i className="fas fa-users ml-3"/><span>נהגים</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/manager/cars">
                        <div onClick={() => this.selectActive('cars')}
                             className={`${active === 'cars' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <div>
                                <i className="fas fa-car ml-3"/><span>רכבים</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/manager/customers">
                        <div onClick={() => this.selectActive('customers')}
                             className={`${active === 'customers' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <div>
                                <i className="fas fa-user-tie ml-3"/><span>לקוחות</span>
                            </div>
                        </div>
                    </NavLink>
                    <div onClick={() => this.selectActive('reports')}
                         className={`${active === 'reports' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                        <div>
                            <i className="fas fa-file-alt ml-3"/><span>דוחות</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Menu);