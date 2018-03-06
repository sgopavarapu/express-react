import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import ReservationList from './components/ReservationList';
import AddForm from './components/AddForm';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        }
        this.getReservations = this.getReservations.bind(this);
        this.updateLocalState = this.updateLocalState.bind(this);
    }
    async getReservations() {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000'
        })
        try {
            let resp = await axiosInstance.get('/reservations')
            this.setState({
                reservations: resp.data
            })
        } catch (err) {
            console.error(err);
        }
    }
    componentDidMount() {
        this.updateLocalState();
    }
    updateLocalState() {
        this.getReservations();
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm text-center">
                        <h1>Hilton Assessment</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <h2>Add Reservations</h2>
                    </div>
                </div>
                <AddForm updateState={this.updateLocalState}/>
                <div className="row">
                    <div className="col-sm">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <h2>Current Reservations</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <ReservationList rsv={this.state.reservations} />
                    </div>
                </div>
            </div>
        )
    }
}


render(<App/>, document.getElementById('react_app'))