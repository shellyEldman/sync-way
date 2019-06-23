import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Car = () => {
    return(
        <div className="car border shadow-sm p-3 my-3">

            <div className="text-right">
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">לחץ למידע נוסף</Tooltip>}>
                    <i className="fas fa-chevron-down float-left mr-2"/>
                </OverlayTrigger>
            </div>

            <div className="d-flex justify-content-between mt-2 text-center">
                <div className="car-info flex-fill">
                    <img src="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" alt="Avatar" className="avatar"/>
                </div>
                <div className="car-info border-left flex-fill">
                    <p className="m-0">רנו מגאן</p>
                    <p className="m-0 less-font">סוג</p>
                </div>
                <div className="car-info border-left flex-fill">
                    <p className="m-0">גרנד קופה</p>
                    <p className="m-0 less-font">דגם</p>
                </div>
                <div className="car-info border-left flex-fill">
                    <p className="m-0">45636273</p>
                    <p className="m-0 less-font">מס' רישוי</p>
                </div>
                <div className="car-info border-left flex-fill">
                    <p className="m-0">6.9.20</p>
                    <p className="m-0 less-font">תוקף טסט</p>
                </div>
                <div className="car-info border-left flex-fill">
                    <p className="m-0">3.8.19</p>
                    <p className="m-0 less-font">תוקף ביטוח</p>
                </div>
                <div className="car-info border-left flex-fill">
                    <p className="m-0">משה כהן</p>
                    <p className="m-0 less-font">נהג עיקרי</p>
                </div>
                <div className="car-info flex-fill">
                    <p className="m-0">22</p>
                    <p className="m-0 less-font">מס' מושבים</p>
                </div>
                <div className="car-info">
                    <button type="button" className="btn btn-sm btn-secondary rounded-pill my-1 py-0 px-3">ערוך רכב</button>
                    <button type="button" className="btn btn-sm text-danger btn-outline-secondary rounded-pill py-0 px-3">מחק רכב</button>
                </div>
            </div>
        </div>
    );
};

export default Car;