import React from 'react';
import axios from 'axios';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            hotelName: '',
            arrivalDate: '',
            departureDate: '',
            reservationID: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addReservation = this.addReservation.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }
    handleSubmit(event) {
        console.log('Form submitted', JSON.stringify(this.state));

        this.addReservation();
        event.preventDefault();
    }
    async addReservation() {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000'
        })

        try {
            let resp = await axiosInstance.post('/reservation', {
                name: this.state.name,
                hotelName: this.state.hotelName,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate
            })
            this.setState({
                reservationID: resp.data.data.makeReservation.id
            });
            this.props.updateState();
        } catch (err) {
            console.error(err);
        }

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            required={true}/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="hotelName">Hotel Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="hotelName"
                            name="hotelName"
                            placeholder="Enter the hotel name"
                            onChange={this.handleInputChange}
                            value={this.state.hotelName}
                            required={true}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="arrivalDate">Arrival Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="arrivalDate"
                            name="arrivalDate"
                            onChange={this.handleInputChange}
                            value={this.state.arrivalDate}
                            required={true}/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="departureDate">Departure Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="departureDate"
                            name="departureDate"
                            min={this.state.arrivalDate}
                            onChange={this.handleInputChange}
                            value={this.state.departureDate}
                            required={true}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Add Reservation</button>
                {this.state.reservationID != '' &&
                    <small>Reservation created with ID: {this.state.reservationID}</small>
                }
            </form>
        )
    }
}

export default AddForm;