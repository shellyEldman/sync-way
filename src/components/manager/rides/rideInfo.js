import React from 'react';
import {Collapse} from "react-bootstrap";
import {Timeline} from 'antd';
import 'antd/dist/antd.css';

class RideInfo extends React.Component {
    state = {
        open: false,
        map: null
    };

    componentDidMount() {
        const open = this.props.isOpen;

        const map = new window.google.maps.Map(document.getElementById('rideInfoMap'), {
            center: {lat: 31.771959, lng: 35.217018},
            zoom: 7,
            gestureHandling: 'cooperative'
        });

        this.setState({map, open}, () => this.handleRoute());
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isOpen !== this.state.open) {
            this.setState({
                open: nextProps.isOpen
            })
        }
    }

    handleRoute = () => {
        const directionsService = new window.google.maps.DirectionsService;
        const directionsDisplay = new window.google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.state.map);
        console.log('status');
        directionsService.route({
            origin: {lat: 31.9881825, lng: 34.782521599999995},
            destination: {lat: 32.0019712, lng: 34.77138459999992},
            waypoints: [
                {
                    location: {lat: 31.9953306, lng: 34.775765500000034},
                    stopover: true
                }],
            travelMode: 'DRIVING',
        }, function(response, status) {
            console.log('status', status);
            if (status === 'OK') {
                console.log('status', status);
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    render() {
        return (
            <Collapse in={this.state.open}>
                <div className="collapse-inside container mt-4">
                    <div className="row">
                        <div className="col-4">
                            <h5 className="text-right mb-3">תחנות</h5>
                            <Timeline mode="right">
                                <Timeline.Item color="grey">
                                    <span className="text-info ml-2">09:00</span>
                                    <span>- הנחשול 16, ראשון לציון</span>
                                </Timeline.Item>
                                <Timeline.Item color="grey">
                                    <span className="text-info ml-2">09:45</span>
                                    <span>- רבינוביץ 80, חולון</span>
                                </Timeline.Item>
                                <Timeline.Item color="grey">
                                    <span className="text-info ml-2">11:00</span>
                                    <span>- רבין 16, חולון</span>
                                </Timeline.Item>
                            </Timeline>

                            <div className="ride-info-comments">
                                <h5 className="text-right mb-2 mt-0">הערות</h5>
                                <p className="text-right mb-1">אישר קשר להזמנה: רונית - 0537462534</p>
                                <p className="text-right my-0">ההזמנה התקבלה ב-11.3.2019, בשעה 12:46</p>
                            </div>

                        </div>

                        <div className="col bg-dark p-0">
                            <div id="rideInfoMap"/>
                        </div>
                    </div>

                </div>

            </Collapse>
        );
    }
}

export default RideInfo;