import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Customer = () => {
    return(
        <div className="customer border shadow-sm p-3 my-3">

            <div className="text-right">
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">לחץ למידע נוסף</Tooltip>}>
                    <i className="fas fa-chevron-down float-left mr-2"/>
                </OverlayTrigger>
            </div>

            <div className="d-flex justify-content-between mt-2 text-center">
                <div className="customer-info flex-fill">
                    <img src="http://www.tintanton.co.il/wp-content/uploads/2017/08/%D7%A1%D7%9E%D7%9C-%D7%A8%D7%9E%D7%AA-%D7%94%D7%97%D7%99%D7%99%D7%9C-copy.jpg" alt="Avatar" className="avatar"/>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0 font-weight-bolder">בי"ס רמת החייל</p>
                    <p className="m-0 less-font">שם חברה</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">58987354</p>
                    <p className="m-0 less-font">ח.פ / ע.מ</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">איריס לוי</p>
                    <p className="m-0 less-font">איש קשר</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">0543382746</p>
                    <p className="m-0 less-font">טלפון</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">2 שנים 11 חודשים 7 ימים</p>
                    <p className="m-0 less-font">ותק לקוח</p>
                </div>
                <div className="customer-info flex-fill">
                    <p className="m-0">17</p>
                    <p className="m-0 less-font">נסיעות מתוכננות</p>
                </div>
                <div className="customer-info">
                    <button type="button" className="btn btn-sm text-danger btn-outline-secondary rounded-pill p-2">מחק לקוח</button>
                </div>
            </div>
        </div>
    );
};

export default Customer;