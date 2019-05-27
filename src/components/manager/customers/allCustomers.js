import React from 'react';
import {Link} from "react-router-dom";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import Customer from './customer';
import './customers.css';

class AllCustomers extends React.Component {

    render() {
        return (
            <div className="all-customers py-3 pr-5 pl-4">

                <p className="title text-right mt-3">רשימת כל הלקוחות (2)</p>

                <hr/>

                <div className="my-4">
                    <Link to='customers/new'>
                        <Button
                            type="button"
                            className="btn btn-secondary d-flex rounded-pill py-0 px-3 float-right">
                            <span>הוסף לקוח חדש</span>
                            <i className={`fas fa-plus float-left mr-3 mb-0 mt-1`}/>
                        </Button>
                    </Link>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-top">סינון</Tooltip>}>
                        <i className="fas fa-filter"/>
                    </OverlayTrigger>
                </div>

                <div className="customer-items">
                    <Customer/>
                    <Customer/>
                </div>
            </div>
        );
    }
}

export default AllCustomers;