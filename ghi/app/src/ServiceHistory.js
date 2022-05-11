import React from 'react';

function formatDate(date) {
    return date
}

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async handleVinSearchSubmit(event) {
        event.preventDefault();
        // const searchURL = `http://localhost:3000/servicehistory?name=${this.state.search}`
        const searchURL = `http://localhost:3000/servicehistory`
        const fetchConfig = {
            method: "get"
        };
        const response = await fetch(searchURL, fetchConfig)
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/services/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ services: data.services})
        }
    }
    
    render() {
        // const filterServices = (services, search) => {
        //     console.log(`this is the services ${services}`)
        //     console.log(services)
        //     console.log(`this is the search ${search}`)
        //     console.log(search)
        //     // const serviceToCompare = services.vin
        //     // console.log(`service to compare ${serviceToCompare}`)

        //     if (services === search) {
        //         return services;
        //     }
        //     // return services.filter((search)
        // };


        // const { search } = window.location;
        // console.log(`this is the window location ${window.location}`)
        // const query = new URLSearchParams(search).get('s');
        // console.log(`this is the second query ${query}`)


        // const servicesList = this.state.services
        // const search = this.state.search
        // const filteredServices = filterServices(servicesList, serviceToCompare);

        return (
            <div>
            <div>
                <form onSubmit={this.handleVinSearchSubmit}>
                <input
                    type="text"
                    id="search"
                    value={this.state.search}
                    placeholder="Search VIN numbers"
                    name="vin"
                    onChange={this.handleChange}
                />
                <button>Search</button>
                {/* <button type="submit">Search</button> */}
        </form>
            </div>
            <h1>Service History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer name</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.services.map(service => {
                        let serviceToCompare = service
                        // console.log(serviceToCompare)
                        let vipStatus = '';
                        let finishedStatus = ''


                        if (service.is_vip === true) {
                            vipStatus = 'Yes';
                        }
                        if (service.is_finished === false) {
                            finishedStatus = 'd-none'
                        }

                        if (service.vin === this.state.search) {
                            console.log(`omg omg omg omg omg `)
                        }
                        else {
                            finishedStatus = 'd-none'
                        }
                        return (
                            <tr key={service.id}>
                                <td className={finishedStatus}>{service.vin}</td>
                                <td className={finishedStatus}>{service.customer}</td>
                                <td className={finishedStatus}>{formatDate(service.date_time)}</td>
                                <td className={finishedStatus}>{service.technician.name}</td>
                                <td className={finishedStatus}>{service.reason}</td>
                                <td className={finishedStatus}>
                                    {vipStatus}
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

export default ServiceHistory;