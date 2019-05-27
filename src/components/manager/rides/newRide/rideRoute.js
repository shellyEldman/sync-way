import React from 'react';

const RideRoute = ({passengersNum, handleInputChange}) => {
    return(
        <form className="text-right">
            <div className="form-group row">
                <label htmlFor="inputStart" className="col-sm-2 col-form-label">מוצא</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputStartNewRoute"
                           placeholder="הקלד את כתובת המוצא"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputEnd" className="col-sm-2 col-form-label">יעד</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEndNewRoute"
                           placeholder="הקלד את כתובת היעד"/>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="passengersNum" className="col-sm-2 col-form-label">מספר נוסעים</label>
                <div className="col-sm-10">
                    <input onChange={handleInputChange} type="number" className="form-control form-control-sm mt-3" id="passengersNum"
                           min="1" value={passengersNum}/>
                </div>
            </div>

            <div className="form-group row mr-3">
                <label className="addBetween">
                    <i className="fas fa-plus ml-2"/>
                    <span>הוסף תחנת ביניים</span>
                </label>
            </div>

        </form>
    );
};

export default RideRoute;