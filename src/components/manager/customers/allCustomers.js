import React from 'react';
import {Link} from "react-router-dom";
import {Button, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import Customer from './customer';
import './customers.css';

const AddMewClientModal = (props) => {
    return (
        <Modal
            className="text-right"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="text-right">
                <Modal.Title className="text-right" id="contained-modal-title-vcenter">
                    <div className="d-flex">
                        <span>הוספת לקוח חדש</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-new-client">
                    <form className="form-inline px-3">
                        <div className="form-group row text-right">
                            <label htmlFor="inputSearch" className="col-sm-2 col-form-label searchClient">חפש
                                לקוח</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputSearch"
                                       placeholder="הזן ח.פ או ע.מ"/>
                                <button type="submit" className="btn btn-info rounded-pill py-0 px-3 mr-3">חפש</button>
                            </div>
                        </div>

                    </form>

                    <p className="px-5 mt-3">או</p>
                    <p className="px-4 mt-3 inviteClient">הזמן לקוח חדש להצטרף</p>

                    <form className="form-inline px-3">
                        <div className="form-group row text-right mt-2">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label searchClient">שם לקוח</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputName"
                                       placeholder="הזן את שם הלקוח"/>
                                <button type="submit" className="btn btn-info rounded-pill py-0 px-3 mr-3 notVisible">הזמן</button>
                            </div>
                        </div>
                        <div className="form-group row text-right mt-2">
                            <label htmlFor="inputInvite" className="col-sm-2 col-form-label searchClient">מייל</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputInvite"
                                       placeholder="הזן מייל של הלקוח"/>
                                <button type="submit" className="btn btn-info rounded-pill py-0 px-3 mr-3">הזמן</button>
                            </div>
                        </div>

                    </form>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary px-3 rounded-pill py-0" onClick={props.onHide}>סגור</Button>
            </Modal.Footer>
        </Modal>
    );
};


class AllCustomers extends React.Component {
    state = {
        modalShow: false
    };

    modalClose = () => {
        this.setState({modalShow: false});
    };

    render() {
        return (
            <React.Fragment>
                <div className="all-customers py-3 pr-5 pl-4">

                    <p className="title text-right mt-3">רשימת כל הלקוחות (2)</p>

                    <hr/>

                    <div className="my-4">
                        <Link to='customers/new'>
                            <Button
                                onClick={() => this.setState({modalShow: true})}
                                type="button"
                                className="btn btn-secondary d-flex rounded-pill py-0 px-3 float-right">
                                <span>הוסף לקוח חדש</span>
                                <i className={`fas fa-plus float-left mr-3 mb-0 mt-1`}/>
                            </Button>
                        </Link>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-top">סינון</Tooltip>}>
                            <i className="fas fa-filter"/>
                        </OverlayTrigger>
                    </div>

                    <div className="customer-items">
                        <Customer/>
                        <Customer/>
                    </div>
                </div>

                <AddMewClientModal
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                />
            </React.Fragment>
        );
    }
}

export default AllCustomers;