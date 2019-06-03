import React from 'react';
import {NavLink} from "react-router-dom";
import { withRouter } from "react-router";

class Menu extends React.Component {
    state = {
        active: 'home'
    };

    componentDidMount() {
        const path = this.props.location.pathname;

        switch (path) {
            case '/client':
                this.setState({active: 'home'});
                break;
            case '/client/new':
                this.setState({active: 'new'});
                break;
            case '/client/wait':
                this.setState({active: 'wait'});
                break;
            case '/client/rides':
                this.setState({active: 'ride'});
                break;
            case '/client/auctions':
                this.setState({active: 'auctions'});
                break;
            case 'client/suppliers':
                this.setState({active: 'suppliers'});
                break;
            case 'client/passengers':
                this.setState({active: 'passengers'});
                break;
            case '/client/reports':
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
                    <NavLink to="/client">
                        <div onClick={() => this.selectActive('home')}
                             className={`${active === 'home' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-home ml-3"/><span>בית</span>
                        </div>
                    </NavLink>
                    <NavLink to="/client/new">
                        <div onClick={() => this.selectActive('new')}
                             className={`${active === 'new' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-plus ml-3"/><span>הזמנת נסיעה חדשה</span>
                        </div>
                    </NavLink>
                    <NavLink to="/client/rides">
                        <div onClick={() => this.selectActive('ride')}
                             className={`${active === 'ride' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-check ml-3"/><span>נסיעות מאושרות</span>
                        </div>
                    </NavLink>
                    <NavLink to="/client/wait">
                        <div onClick={() => this.selectActive('wait')}
                             className={`${active === 'wait' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-pause ml-3"/><span>נסיעות ממתינות לאישור</span>
                        </div>
                    </NavLink>
                    <NavLink to="/client/auction">
                        <div onClick={() => this.selectActive('auction')}
                             className={`${active === 'auction' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <i className="fas fa-gavel ml-3"/><span>מכרזים</span>
                        </div>
                    </NavLink>
                    <NavLink to="/client/suppliers">
                        <div onClick={() => this.selectActive('suppliers')}
                             className={`${active === 'suppliers' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <div>
                                <i className="fas fa-bus-alt ml-3"/><span>ספקי הסעות</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/client/passengers">
                        <div onClick={() => this.selectActive('passengers')}
                             className={`${active === 'passengers' ? 'bg-info current' : ''} py-2 px-3 d-flex ml-1 menu-item`}>
                            <div>
                                <i className="fas fa-users ml-3"/><span>רשימת נוסעים</span>
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