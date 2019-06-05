import React, {useState, useEffect} from 'react';
import {addNewRideClient} from "../../../store/actions/clientActions";
import {Timeline} from "antd";
import {connect} from "react-redux";
import {Modal, Button} from "react-bootstrap";


const MyVerticallyCenteredModal = (props) => {
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
                    הנחשול 16, ראשון לציון
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-right">
                <p>הזן נוסעים</p>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={props.onHide}>סגור</Button>
                <Button className="btn btn-info mr-2 px-5">שמור</Button>
            </Modal.Footer>
        </Modal>
    );
};


const NextNewRide = ({exactPoints, selectedDate, addNewRide, auth, error}) => {
    const [modalShow, setModalShow] = useState(false);
    const [exactHours, setHours] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [exactDistance, setDistance] = useState(0);
    const [provider, setProvider] = useState(null);

    const modalClose = () => {
        setModalShow(false);
    };

    useEffect(() => {
        let hours = [];
        let hour = selectedDate.getHours();
        let minutes = selectedDate.getMinutes();
        let currentDistance = 0;
        let durationHours = 0;
        let durationMinutes = 0;
        hours[0] = ("0" + hour).slice(-2) + ':' + ("0" + minutes).slice(-2);

        for (let i = 0; i < exactPoints.length; i++) {
            if (exactPoints[i].duration) {
                currentDistance += exactPoints[i].distance.value;
                setDistance(currentDistance);
                let tempHours =  Math.floor(exactPoints[i].duration.value/(60*60));
                durationHours += tempHours;
                let tempMinutes = Math.round((exactPoints[i].duration.value - tempHours*60*60)/60);
                durationMinutes += tempMinutes;
                tempMinutes += minutes;
                let restMin = 0;
                if (tempMinutes > 59) {
                    tempMinutes -= 60;
                    restMin = 1;
                }
                tempHours = tempHours + hour + restMin;
                if (tempHours > 23) {
                    tempHours -= 24;
                }
                hour = tempHours;
                minutes = tempMinutes;
                hours[i+1] = ("0" + hour).slice(-2) + ':' + ("0" + minutes).slice(-2);
            }
        }

        durationHours += Math.floor(durationMinutes/60);
        durationMinutes  = durationMinutes%60;

        if (durationHours === 0) {
            const totalD = `${durationMinutes} דקות`;
            setTotalDuration(totalD)
        } else {
            const totalD = `${durationHours} שעות ו-${durationMinutes} דקות`;
            setTotalDuration(totalD)
        }

        setHours(hours);
        setDistance(currentDistance);
    }, [selectedDate]);

    const handleNewRide = () => {
      addNewRide('1', '2', exactPoints);
    };

    return (
        <div className="newRideClientNext mt-4 container p-0 mx-0 mb-4">
            <div className="row">
                <div className="col">
                    <p className="text-right">
                        <span>תאריך הנסיעה - </span>
                        <span className="text-info">{`${selectedDate.getDate()}.${selectedDate.getMonth()+1}.${selectedDate.getFullYear()}`}</span>
                    </p>
                    <p className="text-right mb-3 title">תחנות</p>
                    <Timeline mode="right">
                        {exactPoints.map((point, i) => {
                            if (!point.final) {
                                return (
                                    <Timeline.Item key={i} color="grey">
                                        <span className="text-info ml-2 time">{exactHours[i]}</span>
                                        <span>- {point.address}</span>
                                        <button onClick={() => setModalShow(true)}
                                                className="btn btn-sm btn-secondary rounded-pill py-0 px-2 mx-5">הזן
                                            נוסעים
                                            ממתינים בתחנה זו
                                        </button>
                                    </Timeline.Item>
                                )
                            }
                            else {
                                return (
                                    <Timeline.Item key={i} color="grey">
                                        <span className="text-info ml-2 time">{exactHours[i]}</span>
                                        <span>- {point.address}</span>
                                    </Timeline.Item>
                                )
                            }
                        })}
                    </Timeline>

                    <p className="text-right mb-0">
                        <span>משך הנסיעה -</span>
                        <span className="mr-1">{totalDuration}</span>
                    </p>
                    <p className="text-right mt-0">
                        <span>מרחק כולל -</span>
                        <span className="mr-1">{(Math.round(exactDistance/100))/10}</span>
                        <span className="mr-1">ק"מ</span>
                    </p>
                    <p className="text-right mt-0">
                        <span className="ml-2 text-info">*</span>
                        <span>זמני הגעה משוערים</span>
                    </p>
                </div>

                <div className="col">
                    <p className="text-right mb-3 title">בחר ספק הסעות</p>

                    <ul className="list-group p-0 text-right mb-2">
                        <li className="list-group-item choose">
                            <span>הגש נסיעה זו למכרז</span>
                            <span className="float-left"><i className="fas fa-info-circle"/></span>
                        </li>
                    </ul>

                    <p className="text-center my-0 or">או</p>

                    <ul className="list-group p-0 text-right mt-2">
                        <li onClick={() => setProvider(1)} className={`list-group-item choose ${provider === 1 ? 'bg-info' : ''}`}>
                            <span>הסעות איציק בע"מ</span>
                            <span className="float-left">ח.פ - 546524589</span>
                        </li>
                        <li onClick={() => setProvider(2)} className={`list-group-item choose ${provider === 2 ? 'bg-info' : ''}`}>
                            <span>טורנדו</span>
                            <span className="float-left">ח.פ - 546876979</span>
                        </li>
                        <li onClick={() => setProvider(3)} className={`list-group-item choose ${provider === 3 ? 'bg-info' : ''}`}>
                            <span>היביסקוס הסעות</span>
                            <span className="float-left">ח.פ - 548458876</span>
                        </li>
                    </ul>

                    <button onClick={handleNewRide} type="button" className="btn btn-info btn-block mt-5 rounded-pill py-1 order">בצע
                        הזמנה
                    </button>

                </div>
            </div>


            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={modalClose}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        error: state.client.newRideError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewRide: (clientId, providerId, newRide) => dispatch(addNewRideClient(clientId, providerId, newRide))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NextNewRide);