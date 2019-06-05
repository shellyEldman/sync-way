import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import RideInfo from './rideInfo';

class RideItem extends React.Component {
    state = {
        openInfo: false
    };

    componentDidMount() {
        this.unlisten = this.props.history.listen((location) => {
            console.log("on route change", location.pathname);
            if (location.pathname !== ('/manager/rides/info/' + this.props.id)) {
                this.setState({openInfo: false});
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleOpenInfo = () => {
        this.setState({openInfo: !this.state.openInfo}, () => {
            if (this.state.openInfo) {
                this.props.history.push('/manager/rides/info/' + this.props.id);
            } else {
                setTimeout(
                    function () {
                        this.props.history.push('/manager/rides');
                    }.bind(this), 500);
            }
        });
    };

    render() {
        const {id} = this.props;
        const open = this.state.openInfo;
        return (
            <div className="ride-item border shadow-sm my-3 py-3 pl-3">

                <div className="text-right">
                    <p className="d-inline bg-warning px-3 py-1 ml-3 recycle-ride"><i className="fas fa-recycle ml-2"/>נסיעה
                        חוזרת: ימים א'-ה'</p>
                    <p className="d-inline ml-3">מספר הזמנה: 53637</p>
                    <p className="d-inline">לקוח: בי"ס יצחק רבין, חולון</p>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-top">לחץ למידע נוסף</Tooltip>}>
                        <i onClick={this.handleOpenInfo}
                           className={`fas fa-chevron-${open ? 'up' : 'down'} float-left`}/>
                    </OverlayTrigger>
                </div>

                <div className="d-flex justify-content-between mt-2 text-center">
                    <div className="ride-info border-left flex-fill">
                        <p className="m-0">21.5.2019</p>
                        <p className="m-0 less-font">תאריך</p>
                    </div>
                    <div className="ride-info border-left flex-fill">
                        <p className="m-0">09:00</p>
                        <p className="m-0 less-font">שעת איסוף</p>
                    </div>
                    <div className="ride-info border-left flex-fill">
                        <p className="m-0">הנחשול 16, בת ים</p>
                        <p className="m-0 less-font">כתובת מוצא</p>
                    </div>
                    <div className="ride-info border-left flex-fill">
                        <p className="m-0">רבין 16, חולון</p>
                        <p className="m-0 less-font">כתובת יעד</p>
                    </div>
                    <div className="ride-info border-left flex-fill">
                        <p className="m-0">שלי אלדמן</p>
                        <p className="m-0 less-font">נהג</p>
                    </div>
                    <div className="ride-info flex-fill">
                        <p className="m-0">46378627</p>
                        <p className="m-0 less-font">רכב</p>
                    </div>
                    <div className="ride-info d-flex flex-column">
                        <button type="button" className="btn btn-sm btn-secondary rounded-pill my-1 py-0 px-3">שנה שיבוץ
                        </button>
                        <button type="button"
                                className="btn btn-sm text-danger btn-outline-secondary rounded-pill py-0 px-3">בטל
                            נסיעה
                        </button>
                    </div>
                </div>

                <Route
                    exact
                    path={`/manager/rides/info/${id}`}
                    render={(props) => <RideInfo {...props} isOpen={this.state.openInfo}/>}
                />
            </div>
        )
    }
}

export default withRouter(RideItem);