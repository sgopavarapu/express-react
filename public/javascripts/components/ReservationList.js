import React from 'react';

const ReservationList = ({rsv}) => (
    <ul className="list-group">
        {rsv.map(item => (
            <a key={item.id} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-50 justify-content-between">
              <h5 className="mb-1">{item.hotelName}</h5>
            </div>
            <p className="mb-1">Arrival Date: {item.arrivalDate}</p>
            <p className="mb-1">Departure Date: {item.departureDate}</p>
            <small>Name: {item.name}</small>
        </a>
        ))}
    </ul>
)

export default ReservationList;