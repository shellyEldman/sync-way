import React from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import Hebrew from 'date-fns/locale/he';
import RiteItem from './rideItem';
import {Link} from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import './rides.css';
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

registerLocale('he', Hebrew);

class AllRides extends React.Component {
    state = {
        startDate: new Date(),
        selectedDate: null,
    };

    handleChangeDate = (date) => {
        this.setState({
            startDate: date
        });
    };

    handleSelectedDate = (e) => {
        console.log('selected', e);
        this.setState({selectedDate: e});
    };

    render() {
        return (
            <div className="rides py-3 pr-5 pl-4">

                <div className="title mt-3">
                    <p className="float-right">רשימת נסיעות יומית (5)</p>
                    <label className="m-0">
                        <p className="my-0 mx-2">תאריך</p>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChangeDate}
                            locale="he"
                            onSelect={this.handleSelectedDate}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            minDate={new Date()}
                        />
                        <i className="far fa-calendar-alt my-0 mx-2"/>
                    </label>
                </div>
                <hr/>

                <div className="my-4">
                    <Link to='/rides/new'>
                        <Button
                            type="button"
                            className="btn btn-secondary d-flex rounded-pill py-0 px-3 float-right">
                            <span>הוסף נסיעה חדשה</span>
                            <i className={`fas fa-plus float-left mr-3 mb-0 mt-1`}/>
                        </Button>
                    </Link>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-top">סינון</Tooltip>}>
                        <i className="fas fa-filter"/>
                    </OverlayTrigger>
                </div>

                <div className="ride-items">
                    <RiteItem id={'1'}/>
                    <RiteItem id={'2'}/>
                    <RiteItem id={'3'}/>
                    <RiteItem id={'4'}/>
                    <RiteItem id={'5'}/>
                </div>
            </div>
        );
    }
}

export default AllRides;