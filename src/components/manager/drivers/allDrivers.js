import React from 'react';
import {Link} from "react-router-dom";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import Driver from './driver';
import './drivers.css';

class AllDrivers extends React.Component {

    render() {
        return (
            <div className="all-drivers py-3 pr-5 pl-4">

                <p className="title text-right mt-3">רשימת כל הנהגים (3)</p>

                <hr/>

                <div className="my-4">
                    <Link to='drivers/new'>
                        <Button
                            type="button"
                            className="btn btn-secondary d-flex rounded-pill py-0 px-3 float-right">
                            <span>הוסף נהג חדש</span>
                            <i className={`fas fa-plus float-left mr-3 mb-0 mt-1`}/>
                        </Button>
                    </Link>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-top">סינון</Tooltip>}>
                        <i className="fas fa-filter"/>
                    </OverlayTrigger>
                </div>

                <div className="ride-items">
                    <Driver/>
                    <Driver/>
                    <Driver/>
                </div>
            </div>
        );
    }
}

export default AllDrivers;