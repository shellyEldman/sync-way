import React from 'react';
import RideRoute from './rideRoute';
import DateSetup from './date';
import ChooseDropdowns from './chooseDropdowns';
import PriceRemarks from './priceRemarks';
import './newRide.css';

class AddNew extends React.Component {
    state = {
        map: null,
        selectedDate: null,
        passengersNum: 5,
        price: 0,
        startDate: new Date(),
        pointStart: null,
        pointEnd: null
    };

    componentDidMount() {
        console.log('props', this.props);
        const map = new window.google.maps.Map(document.getElementById('newRideMap'), {
            center: {lat: 31.771959, lng: 35.217018},
            zoom: 7,
            // gestureHandling: 'cooperative'
        });

        this.setState({map}, () => {
            this.setAutoComplete();
        });

    }

    handleChangeDate = (date) => {
        this.setState({
            startDate: date
        });
    };

    handleSelectedDate = (e) => {
        this.setState({selectedDate: e});
    };

    handleInputChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };

    setAutoComplete = () => {
        const {map} = this.state;

        const inputStart = document.getElementById('inputStartNewRoute');
        const inputEnd = document.getElementById('inputEndNewRoute');
        const options = {
            componentRestrictions: {country: 'il'}
        };

        const autocompleteStart = new window.google.maps.places.Autocomplete(inputStart, options);
        const autocompleteEnd = new window.google.maps.places.Autocomplete(inputEnd, options);

        autocompleteStart.setFields(['address_components', 'geometry', 'name']);
        autocompleteEnd.setFields(['address_components', 'geometry', 'name']);

        let pointStart = null;
        let pointEnd = null;

        autocompleteStart.addListener('place_changed', () => {
            const place = autocompleteStart.getPlace();
            console.log('place', place);

            if (place.geometry.viewport) {
                console.log('location', place.geometry.location.lat(), place.geometry.location.lng());
                pointStart = new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                this.setState({pointStart}, () => {
                    if (this.state.pointEnd) {
                        this.addRoute();
                    } else {
                        map.fitBounds(place.geometry.viewport);
                    }
                });

            } else {
                this.props.map.setCenter(place.geometry.location);
                this.props.map.setZoom(17);  // Why 17? Because it looks good.
            }

            let address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name) || '',
                    (place.address_components[1] && place.address_components[1].short_name) || '',
                    (place.address_components[2] && place.address_components[2].short_name) || ''
                ].join(' ');
            }

            console.log('address', address);
        });

        autocompleteEnd.addListener('place_changed', () => {
            const place = autocompleteEnd.getPlace();
            console.log('place', place);

            if (place.geometry.viewport) {
                pointEnd = new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                this.setState({pointEnd}, () => {
                    if (this.state.pointStart) {
                        this.addRoute();
                    } else {
                        map.fitBounds(place.geometry.viewport);
                    }
                });

            } else {
                this.props.map.setCenter(place.geometry.location);
                this.props.map.setZoom(17);  // Why 17? Because it looks good.
            }

        });
    };

    addRoute = () => {
        const directionsService = new window.google.maps.DirectionsService;
        const directionsDisplay = new window.google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.state.map);

        directionsService.route({
            origin: this.state.pointStart,
            destination: this.state.pointEnd,
            travelMode: 'DRIVING'
        }, function(response, status) {
            console.log('status', status);
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    handleReturn = () => {
        this.props.history.push('/rides');
    };


    render() {
        const {passengersNum, price, startDate} = this.state;

        return (
            <div className="newRide py-3 pr-5 pl-4">
                <div className="addNewRide">

                    <div className="title mt-3">
                        <p onClick={this.handleReturn} className="text-right return"><i className="fas fa-chevron-right ml-2"/>חזור</p>
                        <p className="text-right">נסיעה חדשה</p>
                    </div>

                    <hr/>

                    <div className="mt-4 container">
                        <div className="row">

                            <div className="col-5">

                                <RideRoute passengersNum={passengersNum}
                                           handleInputChange={this.handleInputChange}/>
                                <DateSetup handleChangeDate={this.handleChangeDate} startDate={startDate}
                                           handleSelectedDate={this.handleSelectedDate}/>
                                {/*<ChooseDropdowns/>*/}
                                {/*<PriceRemarks price={price} handleInputChange={this.handleInputChange}/>*/}

                                <div className="mt-4">
                                    {/*<button className="btn btn-outline-secondary px-4 continue-buttons-right">*/}
                                    {/*    <i className="fas fa-chevron-right ml-3"/>*/}
                                    {/*    <span>חזור</span>*/}
                                    {/*</button>*/}
                                    <button className="btn btn-secondary mr-3 px-4 continue-buttons-left">
                                        <span>המשך</span>
                                        <i className="fas fa-chevron-left mr-3"/>
                                    </button>
                                </div>

                            </div>

                            <div className="col-7">
                                <div className="position-sticky" id="newRideMap"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AddNew;