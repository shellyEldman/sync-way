import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Customer = () => {
    return (
        <div className="customer border shadow-sm p-3 my-3">

            <div className="text-right">
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">לחץ למידע נוסף</Tooltip>}>
                    <i className="fas fa-chevron-down float-left mr-2"/>
                </OverlayTrigger>
            </div>

            <div className="d-flex justify-content-between mt-2 text-center">
                <div className="customer-info border-left flex-fill">
                    <p className="m-0 font-weight-bolder">בי"ס רמת החייל</p>
                    <p className="m-0 less-font">שם חברה</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">58987354</p>
                    <p className="m-0 less-font">ח.פ / ע.מ</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">הירדן 13, תל אביב</p>
                    <p className="m-0 less-font">כתובת</p>
                </div>
                <div className="customer-info border-left flex-fill">
                    <p className="m-0">איריס לוי</p>
                    <p className="m-0 less-font">איש קשר</p>
                </div>
                <div className="customer-info flex-fill">
                    <p className="m-0">0543382746</p>
                    <p className="m-0 less-font">טלפון</p>
                </div>
                <div className="customer-info">
                    <button type="button" className="btn btn-sm btn-secondary rounded-pill my-1 py-0 px-3">שלח הודעה
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Customer;