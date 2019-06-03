import React from 'react';
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";
import './navbar.css';

const Navbar = (props) => {
    const {signOut} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
            <a className="navbar-brand" href="/">SYNC-WY</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="align-middle collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item b-i">
                        <span className="badge badge-pill badge-danger pt-1">7</span>
                        <span className="sr-only">unread messages</span>
                    </li>
                    <li className="nav-item envelope">
                        <i className="far fa-envelope text-secondary fa-2x"/>
                    </li>

                    <li className="nav-item">
                        <div className="dropdown">
                            <i className="far fa-user-circle text-secondary mx-4 my-0"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                                <button className="dropdown-item text-right" type="button">פרופיל משתמש</button>
                                <button onClick={signOut} className="dropdown-item text-right"
                                        type="button">התנתק
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="dropdown">
                            <a className="btn btn-md btn-outline-secondary rounded-pill py-0" href="/"
                               role="button"
                               id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="false">
                                עברית <i className="fas fa-chevron-down mr-2"/>
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item d-flex" href="/">עברית</a>
                                <a className="dropdown-item" href="/">English</a>
                                <a className="dropdown-item" href="/">Русский</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

const mapStaToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(mapStaToProps, mapDispatchToProps)(Navbar);