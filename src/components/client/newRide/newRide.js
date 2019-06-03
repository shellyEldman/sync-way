import React from 'react';
import './newRide.css';
import DatePicker from "react-datepicker/es";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import idGenerator from 'react-id-generator';
import NextNewRide from './nextNewRide';


class NewRide extends React.Component {
    state = {
        map: null,
        pointStart: null,
        pointEnd: null,
        rideType: 'single',
        startDate: new Date(),
        selectedDate: new Date(),
        selectedHour: new Date(),
        directionsService: null,
        directionsDisplay: null,
        exactPoints: [],
        middleStations: [],
        timeInPast: false,
        invalidStart: false,
        invalidEnd: false,
        invalidMiddle: [],
        noInput: false,
        next: false
    };

    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('newRideMapClient'), {
            center: {lat: 31.771959, lng: 35.217018},
            zoom: 7,
            // gestureHandling: 'cooperative'
        });

        const date = this.state.selectedDate;
        const hour = this.state.selectedHour;
        date.setHours(8);
        date.setMinutes(0);
        hour.setHours(8);
        hour.setMinutes(0);

        this.setState({
            map,
            selectedHour: hour
        }, () => {
            this.setAutoComplete();
        });
    }

    setAutoComplete = () => {
        const {map} = this.state;

        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer({
            draggable: true,
            map: map,
        });

        directionsDisplay.addListener('directions_changed', () => {
            const myRoute = directionsDisplay.getDirections().routes[0];
            this.setState({exactPoints: []}, () => {
                const newPoints = [];
                let i = 0;
                while (i < myRoute.legs.length) {
                    newPoints.push({
                        address: myRoute.legs[i].start_address,
                        location: {
                            lat: myRoute.legs[i].start_location.lat(),
                            lng: myRoute.legs[i].start_location.lng(),
                        },
                        distance: myRoute.legs[i].distance,
                        duration: myRoute.legs[i].duration,
                        final: false
                    });
                    i++;
                }
                newPoints.push({
                    address: myRoute.legs[i - 1].end_address,
                    location: {
                        lat: myRoute.legs[i - 1].end_location.lat(),
                        lng: myRoute.legs[i - 1].end_location.lng(),
                    },
                    final: true
                });
                this.setState({exactPoints: newPoints});
            });
            console.log('directionsDisplay changed', directionsDisplay.getDirections().routes[0]);
        });

        this.setState({directionsService, directionsDisplay});

        const inputStart = document.getElementById('inputStartNewRouteClient');
        const inputEnd = document.getElementById('inputEndNewRouteClient');
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

            if (place.geometry) {
                if (place.geometry.viewport) {
                    pointStart = new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                    this.setState({pointStart}, () => {
                        if (this.state.pointEnd) {
                            this.addRoute(directionsService, directionsDisplay);
                        }
                    });
                    this.setState({invalidStart: false});
                }
            } else {
                this.setState({invalidStart: true});
            }
        });

        autocompleteEnd.addListener('place_changed', () => {
            const place = autocompleteEnd.getPlace();

            if (place.geometry) {
                if (place.geometry.viewport) {
                    pointEnd = new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                    this.setState({pointEnd}, () => {
                        if (this.state.pointStart) {
                            this.addRoute(directionsService, directionsDisplay);
                        }
                    });
                    this.setState({invalidEnd: false});
                }
            } else {
                this.setState({invalidEnd: true});
            }

        });
    };

    addRoute = (directionsService, directionsDisplay) => {
        const wayPoints = [];
        if (this.state.middleStations.length) {
            for (let i = 0; i < this.state.middleStations.length; i++) {
                if (this.state.middleStations[i].wayPoint.location !== null) {
                    wayPoints.push(this.state.middleStations[i].wayPoint);
                }
            }
        }
        const timeNow = new Date();
        const timeDiff = this.state.selectedDate.getTime() - timeNow.getTime();

        if (timeDiff < 0) {
            this.setState({timeInPast: true});
        } else {
            this.setState({timeInPast: false});
            directionsService.route({
                origin: this.state.pointStart,
                destination: this.state.pointEnd,
                travelMode: 'DRIVING',
                waypoints: wayPoints,
                optimizeWaypoints: true,
                drivingOptions: {
                    departureTime: new Date(Date.now() + timeDiff)
                }
            }, function (response, status) {
                console.log('status', status, response);
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    };

    handleChangeDate = (date) => {
        this.setState({selectedDate: date}, () => {
            if ((this.state.pointStart !== null) && (this.state.pointEnd !== null)) {
                this.addRoute(this.state.directionsService, this.state.directionsDisplay);
            }
        });
    };

    handleChangeHour = (date) => {
        this.setState({selectedHour: date});
        const newDate = this.state.selectedDate;
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        this.setState({selectedDate: newDate}, () => {
            if ((this.state.pointStart !== null) && (this.state.pointEnd !== null)) {
                this.addRoute(this.state.directionsService, this.state.directionsDisplay);
            }
        });
    };

    handleRemoveMiddle = (id) => {
        const newMiddle = this.state.middleStations.filter(station => station.id !== id);
        this.setState({middleStations: newMiddle});
    };

    handleAddMiddle = () => {
        const middle = this.state.middleStations;
        const id = idGenerator();

        const newInvalidMiddle = [
            ...this.state.invalidMiddle,
            {
                id,
                invalid: false
            }
        ];

        this.setState({invalidMiddle: newInvalidMiddle}, () => {

            const newStation = {
                id,
                wayPoint: {
                    location: null,
                    stopover: true
                }
            };

            middle.push(newStation);

            this.setState({
                middleStations: middle
            }, () => {
                this.scrollToBottom();

                const inputMiddle = document.getElementById(id);
                const autocompleteMiddle = new window.google.maps.places.Autocomplete(inputMiddle, {
                    componentRestrictions: {country: 'il'}
                });
                autocompleteMiddle.setFields(['address_components', 'geometry', 'name']);
                let pointMiddle = null;

                autocompleteMiddle.addListener('place_changed', () => {
                    const place = autocompleteMiddle.getPlace();

                    if (place.geometry) {
                        if (place.geometry.viewport) {
                            pointMiddle = new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                            const changeLocaion = {
                                ...newStation,
                                wayPoint: {
                                    location: pointMiddle,
                                    stopover: true
                                }
                            };

                            const newMiddle = this.state.middleStations.map(station => {
                                if (station.id === id) {
                                    return changeLocaion;
                                } else {
                                    return station;
                                }
                            });

                            this.setState({middleStations: newMiddle}, () => {
                                if (this.state.pointStart && this.state.pointEnd) {
                                    this.addRoute(this.state.directionsService, this.state.directionsDisplay);
                                }
                            });

                            const valid = {
                                id,
                                invalid: false
                            };
                            const newValid = this.state.invalidMiddle.map(el => {
                                if (el.id === id) {
                                    return valid;
                                } else {
                                    return el;
                                }
                            });
                            this.setState({invalidMiddle: newValid});
                        }
                    } else {
                        const invalid = {
                            id,
                            invalid: true
                        };
                        const newInvalid = this.state.invalidMiddle.map(el => {
                            if (el.id === id) {
                                return invalid;
                            } else {
                                return el;
                            }
                        });
                        this.setState({invalidMiddle: newInvalid});
                    }
                });

            });
        });
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    };

    handleNext = () => {
        if (this.checkValid()) {
            this.setState({next: true});
        }
    };

    checkValid = () => {
        console.log('invalid', this.state.invalidStart, this.state.invalidEnd, this.state.invalidMiddle);
        const thereIsInvalidMiddle = this.state.invalidMiddle.find(el => el.invalid === true);
        if (thereIsInvalidMiddle || this.state.invalidEnd || this.state.invalidStart || this.state.timeInPast) {
            return false;
        } else if (!this.state.pointStart || !this.state.pointEnd) {
            this.setState({noInput: true}, () => {
                return false;
            });
        } else {
            return true;
        }
    };

    render() {
        const {rideType, next, noInput, pointStart, pointEnd, invalidMiddle, invalidStart, invalidEnd, selectedDate, startDate, selectedHour, exactPoints, middleStations, timeInPast} = this.state;
        // console.log('exact points', exactPoints);
        // console.log('selected Date', selectedDate);
        // console.log('middle stations', middleStations);

        const thereIsInvalidMiddle = invalidMiddle.find(el => el.invalid === true);

        return (
            <div className="newRideClient py-3 pr-5 pl-4">
                <div className="addNewRideClient">

                    <div className="title mt-3">
                        {next && <p onClick={() => this.setState({next: false})} className="text-right back mb-1">
                            <i className="fas fa-arrow-right ml-1"/>
                            <span>חזרה</span>
                        </p>}
                        <p className="text-right">הזמנת נסיעה חדשה</p>
                    </div>

                    <hr/>

                    <div className={`mt-4 container p-0 mx-0 mb-4 ${next ? 'd-none' : ''}`}>
                        <div className="row">

                            <div className="col-5">

                                <table className="table table-bordered">
                                    <tbody>
                                    <tr>
                                        <td onClick={() => this.setState({rideType: 'single'})}
                                            className={`text-center ${rideType === 'single' ? 'border border-info' : ''} p-1`}>נסיעה
                                            חד פעמית
                                        </td>
                                        <td onClick={() => this.setState({rideType: 'multiple'})}
                                            className={`text-center ${rideType === 'multiple' ? 'border border-info' : ''} p-1`}>נסיעה
                                            קבועה
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <div className="text-right my-t d-flex flex-column select-content">


                                    {rideType === 'multiple' && <div className="text-right">
                                        <p className="mb-1">בחר את ימי הנסיעה</p>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="sunday"
                                                   value="sunday"/>
                                            <label className="form-check-label mr-1" htmlFor="sunday">א'</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="monday"
                                                   value="monday"/>
                                            <label className="form-check-label mr-1" htmlFor="monday">ב'</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="tuesday"
                                                   value="tuesday"/>
                                            <label className="form-check-label mr-1" htmlFor="tuesday">ג'</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="wednesday"
                                                   value="wednesday"/>
                                            <label className="form-check-label mr-1" htmlFor="wednesday">ד'</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="thursday"
                                                   value="thursday"/>
                                            <label className="form-check-label mr-1" htmlFor="thursday">ה'</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="friday"
                                                   value="friday"/>
                                            <label className="form-check-label mr-1" htmlFor="friday">ו'</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-4">
                                            <input className="form-check-input" type="checkbox" id="saturday"
                                                   value="saturday"/>
                                            <label className="form-check-label mr-1" htmlFor="saturday">ש'</label>
                                        </div>
                                    </div>}


                                    <div className="form-group date-form row mb-0 mt-2">
                                        <label htmlFor="inputDate" className="col-sm-2 col-form-label">תאריך</label>
                                        <div className="col-sm-10 text-right">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={this.handleChangeDate}
                                                locale="he"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control form-control-sm"
                                                minDate={startDate}
                                                id="inputDate"
                                            />
                                            <label htmlFor="inputDate">
                                                <i className="far fa-calendar-alt my-0 mx-2"/>
                                                {rideType === 'multiple' && <span>(תאריך הנסיעה הקרובה)</span>}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group row mt-1">
                                        <label htmlFor="inputHour" className="col-sm-2 col-form-label">שעה</label>
                                        <div className="col-sm-10 text-right">
                                            <DatePicker
                                                selected={selectedHour}
                                                onChange={this.handleChangeHour}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                dateFormat="HH:mm"
                                                timeFormat="HH:mm"
                                                timeCaption="Time"
                                                id="inputHour"
                                                className="form-control form-control-sm"
                                            />
                                            <label htmlFor="inputHour">
                                                <i className="far fa-clock mx-2"/>
                                                <span>(שעת יציאה)</span>
                                            </label>
                                        </div>
                                    </div>


                                    <div className="form-group row mt-4 mb-0">
                                        <label htmlFor="inputStartNewRouteClient"
                                               className="col-sm-2 col-form-label">מוצא</label>
                                        <div className="col-sm-10">
                                            <input type="text"
                                                   className={`form-control form-control-sm ${invalidStart ? 'border border-danger' : ''}`}
                                                   id="inputStartNewRouteClient"
                                                   placeholder="הקלד את כתובת המוצא"/>
                                        </div>
                                    </div>

                                    <div onClick={this.handleAddMiddle}
                                         className="form-group row mr-0 mt-2 mb-0">
                                        <label className="addBetween">
                                            <i className="fas fa-plus ml-2"/>
                                            <span>הוסף תחנת ביניים</span>
                                        </label>
                                    </div>

                                    <div ref={(el) => {
                                        this.messagesEnd = el;
                                    }}>
                                        {middleStations.map(station => <div key={station.id}>

                                            <div className="form-group row my-0">
                                                <label onClick={() => this.handleRemoveMiddle(station.id)}
                                                       htmlFor={station.id}
                                                       className="col-sm-2 col-form-label">
                                                    <OverlayTrigger
                                                        overlay={<Tooltip id="tooltip-top">הסר</Tooltip>}>
                                                        <i className="fas fa-minus"/>
                                                    </OverlayTrigger>
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                           className={`form-control form-control-sm ${this.state.invalidMiddle.find(el => el.id === station.id).invalid ? 'border border-danger' : ''}`}
                                                           id={station.id}
                                                           placeholder="הקלד כתובת תחנת ביניים"/>
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>

                                    <div
                                        className={`form-group row mb-4 ${middleStations.length ? 'mt-2' : 'mt-1'}`}>
                                        <label htmlFor="inputEndNewRouteClient"
                                               className="col-sm-2 col-form-label">יעד</label>
                                        <div className="col-sm-10">
                                            <input type="text"
                                                   className={`form-control form-control-sm ${invalidEnd ? 'border border-danger' : ''}`}
                                                   id="inputEndNewRouteClient"
                                                   placeholder="הקלד כתובת תחנה סופית"/>
                                        </div>
                                    </div>


                                    {timeInPast &&
                                    <div className="alert alert-danger text-right py-1" role="alert">זמן היציאה הוא בעבר. אנא
                                        בחר
                                        תאריך עתידי.</div>}

                                    {(noInput && (!pointStart || !pointEnd)) &&
                                    <div className="alert alert-danger text-right py-1" role="alert">לא הוזנה כתובת המוצא ו/או כתובת
                                        היעד</div>}

                                    {(thereIsInvalidMiddle || invalidStart || invalidEnd) &&
                                        <div className="alert alert-danger text-right py-1" role="alert">
                                            הוזנה כתובת שגויה!
                                        </div>
                                    }


                                    <button onClick={this.handleNext}
                                            className="btn btn-secondary align-self-end mt-auto rounded-pill py-0 mt-4 mr-3 px-4">
                                        <span>המשך</span>
                                        <i className="fas fa-chevron-left mr-3"/>
                                    </button>

                                </div>

                            </div>

                            <div className="col-7">
                                <div className="position-sticky" id="newRideMapClient"/>
                            </div>
                        </div>
                    </div>


                    {next && <NextNewRide exactPoints={exactPoints} selectedDate={selectedDate}/>}

                </div>
            </div>
        );
    }
}

export default NewRide;