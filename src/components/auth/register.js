import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {signUp, startLoading} from "../../store/actions/authActions";
import './auth.css';

class Register extends React.Component {
    state = {
        firstNext: false,
        secondNext: false,
        client: false,
        manager: false,
        type: '',
        noType: false,
        companyName: '',
        companyNum: '',
        noCompany: false,
        companyAddr: '',
        companyPhone: '',
        firstName: '',
        lastName: '',
        userPhone: '',
        email: '',
        passwordConfirm: '',
        password: '',
        passwordMissMatch: false,
        passwordShort: false,
        noPrivateInfo: false,
        loading: false,
    };

    handleChangeRegister = (type) => {
        if (type === 'manager') {
            this.setState({
                client: false,
                manager: true,
                type
            });
        } else {
            this.setState({
                client: true,
                manager: false,
                type
            });
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (!this.state.firstName || !this.state.lastName || !this.state.userPhone || !this.state.email || !this.state.password || !this.state.passwordConfirm) {
            this.setState({noPrivateInfo: true});
        } else if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                passwordMissMatch: true,
                noPrivateInfo: false,
                passwordShort: false
            });
        } else if (this.state.password.length < 6) {
            this.setState({
                passwordShort: true,
                passwordMissMatch: false,
                noPrivateInfo: false
            });
        } else {
            this.props.startLoading();
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                first: this.state.firstName,
                last: this.state.lastName,
                type: this.state.type,
                companyNum: this.state.companyNum,
                noPrivateInfo: false,
                passwordMissMatch: false,
                passwordShort: false
            };
            this.props.signUp(newUser);
        }
    };


    handleFirstNext = () => {
        if (!this.state.type) {
            this.setState({noType: true});
        } else {
            this.setState({
                firstNext: true,
                noType: false
            });
        }
    };

    handleSecondNext = () => {
        if (!this.state.companyName || !this.state.companyNum) {
            this.setState({noCompany: true});
        } else {
            this.setState({
                firstNext: false,
                secondNext: true,
                noCompany: false
            });
        }
    };

    render() {
        const {firstNext, passwordShort, passwordMissMatch, noType, noCompany, noPrivateInfo, type, secondNext, client, manager, companyName, companyNum, companyAddr, companyPhone, firstName, lastName, userPhone, email, password, passwordConfirm} = this.state;
        const {auth, loading, newUserType} = this.props;

        if (auth.uid && (auth.displayName !== null)) {
            const path = '/' + auth.displayName;
            return <Redirect to={path}/>
        }
        if (newUserType !== null) {
            const path = '/' + newUserType;
            return <Redirect to={path}/>
        }

        return (
            <div className="register-form bg-light d-flex flex-column justify-content-center align-items-center">
                <i className="fas fa-puzzle-piece text-warning"/>
                <h2 className="mt-3 mb-3 text-warning">הרשם ל - <span>SYNC-WY</span></h2>

                {!firstNext && !secondNext && (<div>
                        <div className="choose-form border rounded shadow p-4">
                            <h5 className="text-right">בחר</h5>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div onClick={() => this.handleChangeRegister('manager')}
                                     className={`choose shadow-sm d-flex flex-column justify-content-center align-items-center border ${manager ? 'border-warning' : ''} rounded p-3`}>
                                    <i className="fas fa-bus-alt"/>
                                    <p className="mb-0 mt-3">אני מנהל הסעה</p>
                                    <p className="my-0"> או חברת הסעות</p>
                                </div>
                                <p>או</p>
                                <div onClick={() => this.handleChangeRegister('client')}
                                     className={`choose shadow-sm d-flex flex-column justify-content-center align-items-center border ${client ? 'border-warning' : ''} rounded p-3`}>
                                    <i className="fas fa-building"/>
                                    <p className="mb-0 mt-3">אני מנהל עסק המעוניין</p>
                                    <p className="my-0">להשתמש בשירותי הסעות</p>
                                </div>
                            </div>

                            {(noType && !type) &&
                            <div className="alert alert-danger mt-4 mb-0 py-1 text-right" role="alert">
                                אנא בחר/י באחת מהאפשרויות.
                            </div>}

                            <button onClick={this.handleFirstNext}
                                    className="btn btn-secondary rounded-pill py-0 mt-4">המשך<i
                                className="fas fa-arrow-left mr-2"/></button>

                        </div>

                        <p className="text-center mt-4 border rounder p-2">יש לך כבר חשבון? <Link to="/login"
                                                                                                  className="text-warning">הכנס
                            כאן!</Link></p>

                    </div>

                )}


                {firstNext && <div className="company-fill-form border rounded shadow p-4">
                    <p onClick={() => this.setState({firstNext: false})} className="text-right go-back">
                        <i className="fas fa-arrow-right ml-2"/>חזור</p>
                    <h5 className="text-right">פרטי חברה</h5>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={companyName} name="companyName" type="text"
                                   className={`form-control ${(noCompany && !companyName) ? 'border-danger' : ''}`}
                                   placeholder="שם חברה"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={companyNum} name="companyNum" type="number"
                                   className={`form-control ${(noCompany && !companyNum) ? 'border-danger' : ''}`}
                                   placeholder="ח.פ / ע.מ"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={companyAddr} name="companyAddr" type="text"
                                   className="form-control" placeholder="כתובת חברה"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={companyPhone} name="companyPhone" type="num"
                                   className="form-control" placeholder="טלפון חברה"/>
                        </div>
                    </div>

                    {(noCompany && (!companyNum || !companyName)) &&
                    <div className="alert alert-danger mt-4 mb-3 py-1 text-right" role="alert">
                        אנא מלא/י את הפרטים החסרים.
                    </div>}

                    <button onClick={this.handleSecondNext} className="btn btn-secondary rounded-pill py-0">המשך<i
                        className="fas fa-arrow-left mr-2"/></button>

                </div>}


                {secondNext && <form onSubmit={this.handleSubmit} className="fill-form border rounded shadow p-4">
                    <p onClick={() => this.setState({
                        secondNext: false,
                        firstNext: true
                    })} className="text-right go-back">
                        <i className="fas fa-arrow-right ml-2"/>חזור</p>
                    <h5 className="text-right">פרטים אישיים</h5>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={firstName} name="firstName" type="text"
                                   className={`form-control ${(noPrivateInfo && !firstName) ? 'border-danger' : ''}`}
                                   placeholder="שם פרטי"/>
                        </div>
                        <div className="col">
                            <input onChange={this.handleChange} value={lastName} name="lastName" type="text"
                                   className={`form-control ${(noPrivateInfo && !lastName) ? 'border-danger' : ''}`}
                                   placeholder="שם משפחה"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={userPhone} name="userPhone" type="number"
                                   className={`form-control ${(noPrivateInfo && !userPhone) ? 'border-danger' : ''}`}
                                   placeholder="טלפון"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={email} name="email" type="email"
                                   className={`form-control ${(noPrivateInfo && !email) ? 'border-danger' : ''}`}
                                   placeholder="דואר אלקטרוני"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={password} name="password" type="password"
                                   className={`form-control ${(noPrivateInfo && !password) ? 'border-danger' : ''}`}
                                   placeholder="סיסמא"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={passwordConfirm} name="passwordConfirm"
                                   type="password"
                                   className={`form-control ${(noPrivateInfo && !passwordConfirm) ? 'border-danger' : ''}`}
                                   placeholder="אימות סיסמא"/>
                        </div>
                    </div>

                    {(noPrivateInfo && (!firstName || !lastName || !userPhone || !email || !password || !passwordConfirm)) &&
                    <div className="alert alert-danger mt-4 mb-3 py-1 text-right" role="alert">
                        אנא מלא/י את הפרטים החסרים.
                    </div>}

                    {(passwordMissMatch && (password !== passwordConfirm)) &&
                    <div className="alert alert-danger mt-4 mb-3 py-1 text-right" role="alert">
                        הסיסמאות שהוזנו אינן תואמות.
                    </div>}

                    {(passwordShort && (password.length < 6)) &&
                    <div className="alert alert-danger mt-4 mb-3 py-1 text-right" role="alert">
                        הסיסמא צריכה להכיל לפחות 6 תוים.
                    </div>}


                    <button disabled={loading} type="submit" className="btn btn-warning btn-block">
                        {loading ? (<div className="spinner-border text-dark spinner-border-sm"/>) : (
                            <span>הרשם</span>)}
                    </button>
                </form>}
            </div>

        );
    }
}

const
    mapStateToProps = (state) => {
        return {
            auth: state.firebase.auth,
            loading: state.auth.loading,
            authError: state.auth.authError,
            newUserType: state.auth.newUserType
        }
    };

const
    mapDispatchToProps = (dispatch) => {
        return {
            signUp: (newUser) => dispatch(signUp(newUser)),
            startLoading: () => dispatch(startLoading())
        }
    };

export default connect(mapStateToProps, mapDispatchToProps)

(
    Register
)
;