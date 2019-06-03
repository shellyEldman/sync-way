import React, {useState, useEffect} from 'react';
import {Timeline} from "antd";
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


const NextNewRide = ({exactPoints, selectedDate}) => {
    const [modalShow, setModalShow] = useState(false);
    const [exactHours, setHours] = useState([]);

    const modalClose = () => {
        setModalShow(false);
    };

    useEffect(() => {
        let hours = [];
        let hour = selectedDate.getHours();
        let minutes = selectedDate.getMinutes();
        hours[0] = ("0" + hour).slice(-2) + ':' + ("0" + minutes).slice(-2);
        console.log('0', hours[0]);

        for (let i = 0; i < exactPoints.length; i++) {
            if (exactPoints[i].duration) {
                let tempHours =  Math.floor(exactPoints[i].duration.value/(60*60));
                console.log('duration hours', tempHours);
                let tempMinutes = Math.round((exactPoints[i].duration.value - tempHours*60*60)/60);
                console.log('duration minutes', tempMinutes);
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

        setHours(hours);
    }, [selectedDate]);


    {
        console.log('exactPoints', exactPoints)
    }
    {
        console.log('time', selectedDate.getHours(), selectedDate.getMinutes())
    }

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
                        <li className="list-group-item choose">
                            <span>הסעות איציק בע"מ</span>
                            <span className="float-left">ח.פ - 546524589</span>
                        </li>
                        <li className="list-group-item choose">
                            <span>טורנדו</span>
                            <span className="float-left">ח.פ - 546876979</span>
                        </li>
                        <li className="list-group-item choose">
                            <span>היביסקוק הסעות</span>
                            <span className="float-left">ח.פ - 548458876</span>
                        </li>
                    </ul>

                    <button type="button" className="btn btn-info btn-block mt-5 rounded-pill py-1 order">בצע
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

export default NextNewRide;