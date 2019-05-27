import React from 'react';

class Navbar extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
                <a className="navbar-brand" href="/">SYNC-WY</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="align-middle collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <i className="far fa-user-circle text-secondary ml-4"/>
                        </li>
                        <li className="nav-item b-i">
                            <span className="badge badge-pill badge-danger pt-1">7</span>
                            <span className="sr-only">unread messages</span>
                        </li>
                        <li className="nav-item ml-4 envelope">
                            <i className="far fa-envelope text-secondary fa-2x"/>
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
    }
}

export default Navbar;