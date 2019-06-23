import React from 'react';
import NewOrderItem from './newOrderItem';
import './newOrder.scss';

const NewOrders = () => {
    return (
        <div className="new-orders py-3 pr-5 pl-4">

            <div className="title mt-3">
                <p className="text-right">הזמנות חדשות (17)</p>
            </div>

            {/*<hr/>*/}

            <div className="new-orders-items">
                <NewOrderItem id={'1'}/>
                <NewOrderItem id={'2'}/>
                <NewOrderItem id={'3'}/>
                <NewOrderItem id={'4'}/>
                <NewOrderItem id={'5'}/>
            </div>
        </div>
    );

};

export default NewOrders;