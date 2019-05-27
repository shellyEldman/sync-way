import React from 'react';
import DatePicker from "react-datepicker/es";

class DateSetup extends React.Component {

    render() {
        const {handleSelectedDate, handleChangeDate, startDate, handleInputChange} = this.props;

        return (
            <form className="mt-4 text-right">
                <div className="form-group row my-1">
                    <label htmlFor="inputDate" className="col-sm-2 col-form-label">תאריך</label>
                    <div className="col-sm-10 text-right">
                        <DatePicker
                            selected={startDate}
                            onChange={handleChangeDate}
                            locale="he"
                            onSelect={handleSelectedDate}
                            dateFormat="dd/MM/yyyy"
                            className="form-control form-control-sm"
                            minDate={startDate}
                            id="inputDate"
                        />
                        <label htmlFor="inputDate"> <i className="far fa-calendar-alt my-0 mx-2"/></label>
                    </div>

                </div>
                <div className="form-group row my-0">
                    <label htmlFor="inputHour" className="col-sm-2 col-form-label">שעה</label>
                    <div className="col-sm-10 text-right">
                        {startDate && <DatePicker
                            selected={startDate}
                            // onChange={this.handleChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="HH:mm"
                            timeFormat="HH:mm"
                            timeCaption="Time"
                            id="inputHour"
                            className="form-control form-control-sm"
                        />}
                        <label htmlFor="inputDate"> <i className="far fa-clock my-0 mx-2"/></label>
                    </div>
                </div>

            </form>

        );
    }
}

export default DateSetup;