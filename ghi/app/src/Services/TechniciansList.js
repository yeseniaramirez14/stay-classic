import React from 'react';
import { Link } from 'react-router-dom';



class TechniciansList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            technicians: []
        };
    this.routeChange = this.routeChange.bind(this);
    };


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


    async inactiveTechnician(technician_id){
        const putURL = `http://localhost:8080/api/technicians/${technician_id}/`;
        const fetchConfig = {
            method: "put", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_active: false})
        }; 

        const response = await fetch(putURL, fetchConfig);
        if (response.ok) {
            console.log(response)
            window.location.reload();
        }
    };

    async activeTechnician(technician_id){
        const putURL = `http://localhost:8080/api/technicians/${technician_id}/`;
        const fetchConfig = {
            method: "put", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_active: true})
        }; 

        const response = await fetch(putURL, fetchConfig);
        if (response.ok) {
            console.log(response)
            window.location.reload();
        }
    };



    async deleteTechnician(technician_id){
        const deleteUrl = `http://localhost:8080/api/technicians/${technician_id}/`;
        const fetchConfig = {method: "delete"}        

        // if (technician_id is associated/protected with a service)
        //      list all the services with an update button on the side
        // else
        //      delete 
        const response = await fetch(deleteUrl, fetchConfig);
        if (response.ok) {
            console.log(response)
            window.location.reload();
        }
        // else {
        //     const putURL = `http://localhost:8080/api/technicians/${technician_id}/`;
        //     const fetchConfig = {
        //         method: "put", 
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({technician: <input>technician</input>})
        //     }; 
    
        //     const response = await fetch(putURL, fetchConfig);
        //     if (response.ok) {
        //         console.log(response)
        //         window.location.reload();
        //     }
        // }
    };

    routeChange=() => {
        let path = 'technicians_services_list';
        this.props.history.push(path);
    }
    

    servicesPerTechnician(technician_id) {
        // console.log(this.state.technicians)
        // console.log(this.state.technicians.id)
        // console.log(this.state.services)

        // let technician = this.state.technicians.map(technician => {
        //     return (
        //         technician.id
        //     )
        // })
        let service = this.state.services.map(service => {
            return (
                service.technician.id
            )
        })
    
        if (service.includes(technician_id)) {
            let counter = 0;
            for (let technicianID of service) {
                if (technicianID === technician_id) {
                    counter++ 
                }
            }
            return counter
            // console.log(counter)
            // console.log("there is a match")
        }
    } 

    render() {
        return (
            <div>
                <h1>Technicians List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee number</th>
                            <th># of Service Appointments</th>
                            <th>List of Service Appointments</th>
                            <th>Active?</th>
                            <th>Activate/Deactivate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.technicians.map(technician => {

                            let deactivateStatusButtons = 'btn btn-danger';
                            let activeStatusButtons = 'btn btn-danger d-none'

                            if (technician.is_active === false) {
                                deactivateStatusButtons = 'btn btn-danger d-none'
                                activeStatusButtons = 'btn btn-success'
                            }
                            
                            return (
                                <tr key={technician.employee_number}>
                                    <td>{technician.name}</td>
                                    <td>{technician.employee_number}</td>
                                    <td>{this.servicesPerTechnician(technician.id)}</td>
                                    <td>
                                        <Link to="/technicians_services_list" className="btn btn-warning">Go to list</Link>
                                    </td> 
                                    <td>{technician.is_active ? "Yes" : "No" }</td>                               
                                    <td> 
                                        <button onClick={() => this.inactiveTechnician(technician.id)} type="button" className={deactivateStatusButtons}>Deactivate</button>
                                        <button onClick={() => this.activeTechnician(technician.id)} type="button" className={activeStatusButtons}>Activate</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TechniciansList;