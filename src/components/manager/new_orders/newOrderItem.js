import React, {useState, useEffect} from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import NewOrderInfo from './newOrderInfo';
import {withRouter} from "react-router-dom";

const NewOrderItem = (props) => {
    const [openInfo, setOpenInfo] = useState(false);
    const id = props.id;
    const history = props.history;

    useEffect(() => {
        const unlisten = history.listen((location) => {
            console.log("on route change", location.pathname);
            if (location.pathname !== ('/manager/new_orders/info/' + id)) {
                setOpenInfo(false);
            }
        });

        return () => {
            unlisten();
        }
    }, []);

    const handleOpenInfo = () => {
        if (!openInfo) {
            history.push('/manager/new_orders/info/' + id);
        } else {
            setTimeout(
                function () {
                    history.push('/manager/new_orders');
                }.bind(this), 500);
        }
        setOpenInfo(!openInfo);
    };

    return (
        <div className="new-order-item border shadow-sm my-3 py-3 pl-3">

            <div className="text-right">
                <p className="d-inline bg-warning px-3 py-1 ml-3 recycle-ride"><i className="fas fa-recycle ml-2"/>נסיעה
                    חוזרת: ימים א'-ה'</p>
                <p className="d-inline ml-3">מספר הזמנה: 53637</p>
                <p className="d-inline">לקוח: בי"ס יצחק רבין, חולון</p>
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">לחץ למידע נוסף</Tooltip>}>
                    <i onClick={handleOpenInfo}
                       className={`fas fa-chevron-${openInfo ? 'up' : 'down'} float-left`}/>
                </OverlayTrigger>
            </div>

            <div className="mt-2 d-flex justify-content-between text-center">
                <div className="new-order-info border-left flex-fill">
                    <p className="m-0">21.5.2019</p>
                    <p className="m-0 less-font">תאריך</p>
                </div>
                <div className="new-order-info border-left flex-fill">
                    <p className="m-0">09:00</p>
                    <p className="m-0 less-font">שעת איסוף</p>
                </div>
                <div className="new-order-info border-left flex-fill">
                    <p className="m-0">הנחשול 16, בת ים</p>
                    <p className="m-0 less-font">כתובת מוצא</p>
                </div>
                <div className="new-order-info border-left flex-fill">
                    <p className="m-0">רבין 16, חולון</p>
                    <p className="m-0 less-font">כתובת יעד</p>
                </div>
                <div className="new-order-info border-left flex-fill">
                    <p className="m-0">10</p>
                    <p className="m-0 less-font">מס' נוסעים</p>
                </div>
                <div className="new-order-info flex-fill">
                    <p className="m-0">3</p>
                    <p className="m-0 less-font">מס' תחנות</p>
                </div>
                <div className="new-order-info d-flex flex-column">
                    <button type="button" className="btn btn-sm btn-secondary rounded-pill my-1 py-0 px-4">שיבוץ
                    </button>
                    <button type="button"
                            className="btn btn-sm text-danger btn-outline-secondary rounded-pill py-0 px-4">ביטול
                    </button>
                </div>
            </div>

            <Route
                exact
                path={`/manager/new_orders/info/${id}`}
                render={(props) => <NewOrderInfo {...props} isOpen={openInfo}/>}
            />
        </div>
    )
};

export default withRouter(NewOrderItem);