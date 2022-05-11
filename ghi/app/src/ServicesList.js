import React from 'react';

function formatDate(date) {
    return date
}

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
        console.log(`this is the response: ${response}`)
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

    // const hideRow(service_id) {
    //     const services = this.state.services.map(())
    // }

    render() {
        return (
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
                        console.log(service.is_vip)
                        // let vip = '';
                        let vipStatus = '';
                        if (service.is_vip === true) {
                            vipStatus = 'Yes';
                        }
                        return (
                            <tr key={service.vin}>
                                <td>{service.vin}</td>
                                <td>{service.customer}</td>
                                <td>{formatDate(service.date_time)}</td>
                                <td>{service.technician.name}</td>
                                <td>{service.reason}</td>
                                <td className='vip'>
                                    {vipStatus}
                                </td>
                                <td> <button onClick={() => this.deleteService(service.id)} type="button" className='btn btn-danger'>Cancel</button>
                                 <button type="button" className='btn btn-warning'>Finished</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

export default ServicesList;