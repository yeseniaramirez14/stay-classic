import React from 'react';

class ServicesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8080/api/services/";
        const response = await fetch(url);
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            this.setState({ services: data.services})
        }
    }

    async deleteService(service_id){
        const deleteUrl = `http://localhost:8080/api/services/${service_id}/`;
        const fetchConfig = {method: "delete"}        

        const response = await fetch(deleteUrl, fetchConfig);
        if (response.ok) {
            console.log(`we deleted it`, response)
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
        console.log(response)
        if (response.ok) {
            console.log(`we changed it`, response)
            window.location.reload();
        }
    };

    render() {
        return (
            <div>
            <h1>List of Services</h1>
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
                        console.log(this.state.services)
                        console.log(service.is_finished)
                        // let vip = '';
                        let date = Date.parse(service.date_time)
                        const newDate = new Date(date)

                        let vipStatus = '';
                        let finishedStatus = ''
                        if (service.is_vip === true) {
                            vipStatus = 'Yes';
                        }
                        if (service.is_finished === true) {
                            finishedStatus = 'd-none'
                        }
                        return (
                            <tr key={service.vin}>
                                <td className={finishedStatus}>{service.vin}</td>
                                <td className={finishedStatus}>{service.customer}</td>
                                <td className={finishedStatus}>{ newDate.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'numeric'})}</td>
                                {/* <td className={finishedStatus}>{formatDate(service.date_time)}</td> */}
                                <td className={finishedStatus}>{service.technician.name}</td>
                                <td className={finishedStatus}>{service.reason}</td>
                                <td className={finishedStatus}>
                                    {vipStatus}
                                </td>
                                <td className={finishedStatus}> <button onClick={() => this.deleteService(service.id)} type="button" className='btn btn-danger'>Cancel</button>
                                 <button onClick={() => this.serviceFinished(service.id)} type="button" className='btn btn-warning'>Finished</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        );
    }
}

export default ServicesList;