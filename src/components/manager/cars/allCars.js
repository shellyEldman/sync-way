import React from 'react';
import {Link} from "react-router-dom";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import Car from './car';
import './cars.css'

class AllCars extends React.Component {

    render() {
        return (
            <div className="all-cars py-3 pr-5 pl-4">
                <p className="title text-right mt-3">רשימת כל הרכבים (6)</p>
                <hr/>

                <div className="my-4">
                    <Link to='cars/new'>
                        <Button
                            type="button"
                            className="btn btn-secondary d-flex rounded-pill py-0 px-3 float-right">
                            <span>הוסף רכב חדש</span>
                            <i className={`fas fa-plus float-left mr-3 mb-0 mt-1`}/>
                        </Button>
                    </Link>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-top">סינון</Tooltip>}>
                        <i className="fas fa-filter"/>
                    </OverlayTrigger>
                </div>

                <div className="car-items">
                    <Car/>
                    <Car/>
                    <Car/>
                    <Car/>
                    <Car/>
                    <Car/>
                </div>
            </div>
        );
    }
}

export default AllCars;