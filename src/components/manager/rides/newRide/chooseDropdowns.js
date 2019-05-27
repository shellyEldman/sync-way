import React from 'react';

const ChooseDropdowns = () => {
    return (
        <form className="chooseDropdowns mt-4 drop text-right">
            <div className="form-group row my-1">
                <div className="d-flex">
                    <label htmlFor="driver" className="col-sm-2 col-form-label ml-5">נהג</label>
                    <div className="col-sm-10 text-right">
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary btn-sm px-2" type="button"
                                    id="dropdownMenuDriver" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                <span>בחר נהג</span>
                                <i className="fas fa-chevron-down float-left my-1 mr-2"/>
                            </button>
                            <div className="dropdown-menu py-2 px-3 text-right" aria-labelledby="dropdownMenuDriver">
                                <p className="dropdown-item p-0 m-0">
                                    <i className="fas fa-plus ml-2"/>
                                    <span>הוסף נהג חדש</span>
                                </p>
                                <div className="dropdown-divider"/>
                                <p className="dropdown-item p-0">שלי אלדמן</p>
                                <p className="dropdown-item p-0">איציק בהן</p>
                                <p className="dropdown-item m-0 p-0">משה בן-דוד</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex">
                    <label htmlFor="car" className="col-sm-2 col-form-label ml-3">רכב</label>
                    <div className="col-sm-10 text-right">
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary btn-sm" type="button"
                                    id="dropdownMenuCars" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                <span>בחר רכב</span>
                                <i className="fas fa-chevron-down float-left my-1 mr-2"></i>
                            </button>
                            <div className="dropdown-menu py-2 px-3 text-right" aria-labelledby="dropdownMenuCars">
                                <p className="dropdown-item p-0 m-0">
                                    <i className="fas fa-plus ml-2"/>
                                    <span>הוסף רכב חדש</span>
                                </p>
                                <div className="dropdown-divider"></div>
                                <p className="dropdown-item p-0">666999</p>
                                <p className="dropdown-item p-0">766388</p>
                                <p className="dropdown-item m-0 p-0">663993</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="form-group row my-4">
                <label htmlFor="customer" className="col-sm-2 col-form-label">לקוח</label>
                <div className="col-sm-10 text-right">
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary btn-sm px-4" type="button"
                                id="dropdownMenuCustomer" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            <span>בחר לקוח</span>
                            <i className="fas fa-chevron-down float-left my-1 mr-2"></i>
                        </button>
                        <div className="dropdown-menu py-2 px-3 text-right" aria-labelledby="dropdownMenuCustomer">
                            <p className="dropdown-item p-0 m-0">
                                <i className="fas fa-plus ml-2"/>
                                <span>הוסף לקוח חדש</span>
                            </p>
                            <div className="dropdown-divider"></div>
                            <p className="dropdown-item p-0">לקוח מזדמן</p>
                            <p className="dropdown-item p-0">בית ספר ראשל"צ</p>
                            <p className="dropdown-item m-0 p-0">מפעל ים המלח</p>
                        </div>
                    </div>
                </div>
            </div>

        </form>

    );
};


export default ChooseDropdowns;