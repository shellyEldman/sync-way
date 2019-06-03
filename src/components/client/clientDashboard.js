import React from 'react';
import './client.css';


class ClientDashboard extends React.Component {
    render() {
        return (

            <div className="info-today d-flex justify-content-between m-4">
                <p>בוקר טוב שלי!</p>
                <p>יום חמישי 2.5.2019</p>
            </div>

        );
    }
}

export default ClientDashboard;
