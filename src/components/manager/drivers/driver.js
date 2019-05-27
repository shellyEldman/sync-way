import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Driver = () => {
    return(
        <div className="driver border shadow-sm p-3 my-3">

            <div className="text-right">
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">לחץ למידע נוסף</Tooltip>}>
                    <i className="fas fa-chevron-down float-left mr-2"/>
                </OverlayTrigger>
            </div>

            <div className="d-flex justify-content-between mt-2 text-center">
                <div className="driver-info flex-fill">
                    <img src="https://images.unsplash.com/photo-1495078065017-564723e7e3e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Avatar" className="avatar"/>
                </div>
                <div className="driver-info border-left flex-fill">
                    <p className="m-0 font-weight-bolder">משה כהן</p>
                    <p className="m-0 less-font">שם</p>
                </div>
                <div className="driver-info border-left flex-fill">
                    <p className="m-0">0544487354</p>
                    <p className="m-0 less-font">טלפון</p>
                </div>
                <div className="driver-info border-left flex-fill">
                    <p className="m-0">46373457</p>
                    <p className="m-0 less-font">רכב עיקרי</p>
                </div>
                <div className="driver-info border-left flex-fill">
                    <p className="m-0">2 שנים 6 חודשים 7 ימים</p>
                    <p className="m-0 less-font">ותק</p>
                </div>
                <div className="driver-info flex-fill">
                    <p className="m-0">16</p>
                    <p className="m-0 less-font">מס' נסיעות עתידיות</p>
                </div>
                <div className="driver-info">
                    <button type="button" className="btn btn-sm btn-secondary rounded-pill my-1 py-0 px-3">ערוך נהג</button>
                    <button type="button" className="btn btn-sm text-danger btn-outline-secondary rounded-pill py-0 px-3">מחק נהג</button>
                </div>
            </div>
        </div>
    );
};

export default Driver;