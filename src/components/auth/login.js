import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {signIn, startLoading} from "../../store/actions/authActions";

import {connect} from "react-redux";

import './auth.css';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.startLoading();
        this.props.signIn(this.state.email, this.state.password);
    };


    render() {
        const {email, password} = this.state;
        const {auth, loading} = this.props;
        if (auth.uid) {
            const path = '/' + auth.displayName;
            return <Redirect to={path}/>
        }
        return (
            <div className="login-form bg-light d-flex flex-column justify-content-center align-items-center">
                <i className="fas fa-route text-info"/>
                <h1 className="mt-3 mb-3 text-info">SYNC-WY</h1>

                <form onSubmit={this.handleSubmit} className="border rounded shadow p-4">
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={email} name="email" type="email"
                                   className="form-control" placeholder="דואר אלקטרוני"/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <input onChange={this.handleChange} value={password} name="password" type="password"
                                   className="form-control" placeholder="סיסמא"/>
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="btn btn-info btn-block">
                        {loading ? (<div className="spinner-border text-light spinner-border-sm"/>) : (
                            <span>כניסה</span>)}
                    </button>
                </form>

                <p className="create text-center mt-4 border rounder p-2">אין לך עדיין חשבון? <Link to="/register" className="text-info">הרשם
                    כאן!</Link></p>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        loading: state.auth.loading,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => dispatch(signIn(email, password)),
        startLoading: () => dispatch(startLoading())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);