import React from 'react';

class TargetedRecords extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            targetedRecords: []
        };
    };

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesrecords/";
        const response = await fetch(url);
        console.log(`this is the response: ${response}`)
        console.log(response)

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            

            this.setState({sales_records: data.salesrecord})
            
        }
    }

    render() {
        return (
            <h1>Service History</h1>
            <div className="mb-3">
                        <select onChange={this.handleChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                          <option value="">Choose a Customer</option>
                          {console.log("test", this.state)}
                          {this.state.customers.map(customer => {
                            return (
                              <option key={customer.name} value={customer.name}>{customer.name}</option>
                            )
                          })}
                        </select>
                      </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>test</th>
                        <th>Customer name</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.services.map(service => {
                        let date = Date.parse(service.date_time)
                        const newDate = new Date(date)
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
                                <td className={finishedStatus}>{ newDate.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'numeric'})}</td>
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

export default TargetedRecords;