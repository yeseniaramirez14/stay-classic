import React from 'react';
import { Link } from 'react-router-dom';


class TechniciansServicesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {           
            services: [],
            technicians: [],      
        };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    };
    

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }


    async componentDidMount() {
        const technicianURL = "http://localhost:8080/api/technicians/";
        const servicesURL = "http://localhost:8080/api/services/"

        const technicianResponse = await fetch(technicianURL);
        const servicesResponse = await fetch(servicesURL)

        // console.log(technicianResponse)
        // console.log(servicesResponse)

        if (technicianResponse.ok && servicesResponse.ok) {
            const technicianData = await technicianResponse.json();
            const servicesData = await servicesResponse.json();

            // console.log(technicianData)
            // console.log(servicesData)

            this.setState({ 
                technicians: technicianData.technicians,
                services: servicesData.services,
            })
        }
    }


    async deleteService(service_id){
        const deleteUrl = `http://localhost:8080/api/services/${service_id}/`;
        const fetchConfig = {method: "delete"}        

        const response = await fetch(deleteUrl, fetchConfig);
        if (response.ok) {
            console.log(response)
            window.location.reload();
        }
    };


    async serviceFinished(service_id){
        const putURL = `http://localhost:8080/api/services/${service_id}/`;
        const fetchConfig = {
            method: "put", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_finished: true})
        }; 

        const response = await fetch(putURL, fetchConfig);
        if (response.ok) {
            console.log(response)
            window.location.reload();
        }
    };

    render() {
        return (
            <div>
                <h1>A list of technician's unfinished appointments</h1>
                <div className="mb-3">
                    <select onChange={this.handleChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                        <option value="">Choose a technician</option>
                        {this.state.technicians.map(technician => {
                        return (
                            <option key={technician.id} value={technician.name}>{technician.name}</option>
                        )
                        })}
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date and Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>VIP</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.services.map(service => {

                            let date = Date.parse(service.date_time)
                            const newDate = new Date(date)

                            let vipStatus = '';
                            let finishedStatus = ''

                            if (service.is_vip === true) {
                                vipStatus = 'VIP';
                            }
                            if (service.is_finished === true) {
                                finishedStatus = 'd-none'
                            }

                            if (this.state.technician === service.technician.name) {
                                return (
                                    <tr key={service.id}>
                                        <td className={finishedStatus}>{service.vin}</td>
                                        <td className={finishedStatus}>{service.customer}</td>
                                        <td className={finishedStatus}>{newDate.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'numeric'})}</td>
                                        <td className={finishedStatus}>{service.technician.name}</td>
                                        <td className={finishedStatus}>{service.reason}</td>
                                        <td className={finishedStatus}>{vipStatus}</td>
                                        <td className={finishedStatus}> 
                                            <Link to="/editservice" className="btn btn-warning">Edit</Link>
                                            <button onClick={() => this.deleteService(service.id)} type="button" className='btn btn-danger'>Cancel</button>
                                            <button onClick={() => this.serviceFinished(service.id)} type="button" className='btn btn-success'>Finished</button>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default TechniciansServicesList;