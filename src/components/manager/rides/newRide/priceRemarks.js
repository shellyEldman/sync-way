import React from 'react';

const PriceRemarks = ({handleInputChange, price}) => {
    return (
        <form className="mt-4 drop text-right">

            <div className="form-group row my-0">
                <label htmlFor="price" className="col-sm-2 col-form-label">מחיר נסיעה</label>
                <div className="col-sm-10">
                    <input onChange={handleInputChange} type="number" className="form-control form-control-sm mt-3"
                           id="price"
                           min="0" value={price}/>
                </div>
            </div>

            <div className="form-group row my-0">
                <label htmlFor="Textarea" className="col-sm-2 col-form-label">הערות</label>
                <div className="col-sm-10">
                                     <textarea className="form-control" id="Textarea"
                                               rows="3"/>
                </div>
            </div>

        </form>
    );
};

export default PriceRemarks;